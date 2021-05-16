import { PanelBaseView } from "symposium";
import { renderman } from "../../renderman";

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

    render_to_string() {

        let html_panel = "",
            context = {};

        if (!this.collection) {
            return html_panel;
        }
        context['objects'] = this.collection;
        html_panel = renderman.render(
            this.template_name,
            context
        );

        return html_panel;
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