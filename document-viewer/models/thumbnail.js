import { Page } from "./page";

class Thumbnail extends Page {
    /**
    Thumbnail or page thumbnail is used to abstract
    a mini version of document's page.
    */
    constructor({
        id,
        page_num,
        loading
    }) {
        super({
            id: id,
            page_num: page_num,
            // thumnails don't have metadata
            metadata: undefined,
            loading: loading
        });
    }

    toString() {
        return `Thumbnail(id=${this.id}, page_num=${this.page_num})`;
    }
}


export { Thumbnail };
