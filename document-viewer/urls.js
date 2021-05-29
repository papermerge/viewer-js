import { Page, Document } from "./models/index";


class UrlConf {
    /**
     *
     * Central point for managing urls.
     */

    constructor(prefix="/viewer") {
        this._prefix = prefix;
    }

    document_url(doc) {
        let doc_id;

        if (doc && doc.id) {
            doc_id = doc.id;
        } else {
            doc_id = doc;
        }

        return `${this.prefix}/document/${doc_id}`;
    }

    page_url(page) {
        let page_id;

        if (page && page.id) {
            page_id = page.id;
        } else {
            page_id = page;
        }

        return `${this.prefix}/page/${page_id}`;
    }

    root_url() {
        return this.prefix;
    }

    set prefix(value) {
        this._prefix = value;
    }

    get prefix() {
        return this._prefix;
    }
}

// there is only one UrlConf instance
let urlconf = new UrlConf();


export { urlconf };