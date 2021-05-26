import { PanelBaseView } from "@papermerge/symposium";
import { renderman } from "../../renderman";


class ThumbnailsPanelView extends PanelBaseView {

    get default_template_name() {
        return "templates/panel/thumbnails.html";
    }

    get default_template_engine() {
        return renderman;
    }

    constructor({
        collection,
        options={}
    }) {
        super({collection, options});
    }

    render(thumbnail) {

        let panel_html,
            thumbnails_view,
            svg_container,
            thumb_dom_ref;

        // render entire collection of thumbnails
        if (!thumbnail) {
            return super.render();
        }

        if (this.el) {
            thumb_dom_ref = this.el.querySelector(`[data-id='${thumbnail.id}']`);
            svg_container = thumb_dom_ref.querySelector('.svg-container');

            if (svg_container) {
                svg_container.innerHTML = thumbnail.svg_image;
                thumb_dom_ref.querySelector('.loader').classList.remove("visible");
            }
        }
    }
};


export { ThumbnailsPanelView };