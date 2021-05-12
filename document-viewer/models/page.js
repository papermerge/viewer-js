import { Model } from "symposium";

class Page extends Model {

    constructor({
        id,
        page_num,
        metadata
    }) {
        super();
        this.id = id;
        this.page_num = page_num;
        this.cpage_num = page_num;
        this._svg_image = undefined;
        this.metadata = metadata;
        this.selected = false;
    }

    toString() {
        return `Page(id=${this.id}, page_num=${this.page_num})`;
    }

    get is_selected() {
        return this.selected;
    }

    toggle_selection() {
        this.selected = !this.selected;
        return this.selected;
    }

    set svg_image(text) {
        this._svg_image = text;
        this.trigger("change:svg_image", this);
    }

    get svg_image() {
        return this._svg_image;
    }
}


export { Page };
