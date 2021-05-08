import { Model } from "symposium";

class Thumbnail extends Model {
    /**
    Thumbnail or page thumbnail is used to abstract
    a mini version of document page.
    */
    constructor({
        id,
        page_num
    }) {
        super();
        // page id
        this.id = id;
        // i.e. page order within specific document version
        this.page_num = page_num;
        /*
        `cpage_num` = client page number.
        When users changes page order - it changes first `cpage_num`.
        `cpage_num` is later sent to server side. Only after server side change
        is commited - the `page_num` attribute is changed here.
        Basically `this.cpage_num` == `this.page_num` means that server side
        is synchronized with client side.
        */
        this.cpage_num = page_num;
        // If thumbnail is visually selected
        this.selected = false;
    }

    toString() {
        return `Thumbnail(id=${this.id})`;
    }

    get is_selected() {
        return this.selected;
    }

    toggle_selection() {
        this.selected = !this.selected;
        return this.selected;
    }
}


export { Thumbnail };
