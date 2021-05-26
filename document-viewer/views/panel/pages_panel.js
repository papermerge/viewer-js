import { PanelBaseView } from "@papermerge/symposium";
import { renderman } from "../../renderman";


class PagesPanelView extends PanelBaseView {

    get default_template_name() {
        return "templates/panel/pages.html";
    }

    get default_template_engine() {
        return renderman;
    }

    constructor({
        collection,
        options={}
    }) {
        super({collection, options});

        this.initial_width = undefined;
        this.initial_height = undefined;

        this.on("zoom", this.on_zoom, this);
        this.on("post-render", this.on_post_render, this);
    }

    on_zoom(zoom_value) {
        let all_pages,
            that = this,
            rect,
            new_width,
            new_height;

        if (this.initial_width && this.initial_height) {
            this.all_pages_el.forEach((page_el) => {
                new_width = that.initial_width * zoom_value / 100;
                new_height = that.initial_height * zoom_value / 100;
                page_el.style.width = `${new_width}px`;
                page_el.style.height = `${new_height}px`;
            });
        } else {
            console.log(`Initial width & height not yet defined`);
        }
    }

    on_post_render() {
        /*
            Initialize initial/original page width and height
            so that later zoom in/zoom out will be performed
            relative to these (initial width and height) values.
        */
        let rect,
            first_page;

        first_page = this.first_page_el;
        if (first_page) {
            rect = first_page.getBoundingClientRect();
            this.initial_width = rect.width;
            this.initial_height = rect.height;
        }
    }

    scroll_to(page_id) {
        let dom_item;

        dom_item = this.page_el(page_id);

        if (dom_item) {
            dom_item.scrollIntoView();
        }
    }

    page_el(page_id) {
        /*
        Returns DOM Element of page identified with this ID.
        */
        return this.el.querySelector(`.item.page[data-id='${page_id}']`);
    }

    get first_page_el() {
        /*
        Returns DOM Element of first page.
        */
        return this.el.querySelector('.item.page');
    }

    get all_pages_el() {
        /*
        Returns an array of all pages DOM Elements.
        */
        return this.el.querySelectorAll('.item.page');
    }

    render(page) {
        /*
        `page` parameter is an instance of models.page.Page.
        */
        let panel_html,
            page_view,
            svg_container,
            page_dom_el;

        // render entire collection of pages
        if (!page) {
            return super.render();
        }

        if (this.el) {
            page_dom_el = this.page_el(page.id);
            svg_container = page_dom_el.querySelector('.svg-container');
            if (svg_container) {
                svg_container.innerHTML = page.svg_image;
                page_dom_el.querySelector('.loader').classList.remove("visible");
            }
        }

        this.trigger("post-render");
    }
};


export { PagesPanelView };