import { Page, Document } from "./models/index";


class UrlConf {
    /**
     *
     * Central point for managing urls.
     */

    constructor(prefix="/viewer") {
        this._prefix = prefix;
    }

    folder_url(folder) {
        let folder_id;

        if (folder && folder.id) {
            folder_id = folder.id;
        } else {
            folder_id = folder;
        }

        return `${this.prefix}/folder/${folder_id}`;
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
        return `${this.prefix}/document/${page.document_id}/page/${page.page_num}`;
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