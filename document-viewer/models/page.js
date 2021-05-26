import { Model } from "@papermerge/symposium";

class Page extends Model {

    constructor({
        id,
        page_num,
        metadata,
        loading=true
    }) {
        super();
        this.id = id;
        this.page_num = page_num;
        this.cpage_num = page_num;
        this._svg_image = undefined;
        this.metadata = metadata;
        this.selected = false;
        // _loading attribute is responsable
        // for toggling visibility of loader
        // UI element
        this._loading = loading;
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
        this.trigger("change", this);
    }

    get svg_image() {
        return this._svg_image;
    }

    get loading() {
        return this._loading;
    }

    set loading(value) {
        if (value != this._loading) {
            this._loading = value;
            this.trigger("change");
        }
    }
}


export { Page };
