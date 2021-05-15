import { PanelBaseView } from "./base";
import { renderman } from "../../renderman";

const PAGES_TEMPLATE_NAME = "templates/panel/pages.html";


class PagesPanelView extends PanelBaseView {

    get template_name() {
        return this.options['template_name'] || PAGES_TEMPLATE_NAME;
    }

    constructor({
        collection,
        options={}
    }) {
        super({collection, options});
    }

    scroll_to(page_id) {
        let dom_item;

        dom_item = this.el.querySelector(`.item.page[data-id='${page_id}']`);

        console.log(dom_item);
        if (dom_item) {
            dom_item.scrollIntoView();
        }
    }

    render(page) {
        let panel_html,
            page_view,
            svg_container;

        // render entire collection of pages
        if (!page) {
            return super.render();
        }

        if (this.el) {
            svg_container = this.el.querySelector(`[data-id='${page.id}'] > .svg-container`);
            if (svg_container) {
                svg_container.innerHTML = page.svg_image;
            }
        }
    }
};


export { PagesPanelView };