import { PanelBaseView } from "./base";

const PAGES_TEMPLATE_NAME = "templates/panel/pages.html";
const THUMBNAILS_TEMPLATE_NAME = "templates/panel/thumbnails.html";


class ThumbnailsPanelView extends PanelBaseView {

    get template_name() {
        return this.options['template_name'] || THUMBNAILS_TEMPLATE_NAME;
    }

    constructor({
        collection,
        options={}
    }) {
        super({collection, options});
    }
};


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
};


export { ThumbnailsPanelView, PagesPanelView };