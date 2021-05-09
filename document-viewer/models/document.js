import { Model } from "symposium";

import { urlconf } from "../urls";


class Document extends Model {

    constructor({id, title}) {
        super();
        this.id = id;
        this.title = title;
    }

    toString() {
        return `Document(id=${this.id}, title=${this.title}, ...)`;
    }

    get href() {
        return urlconf.document_url(this.id);
    }
}

export { Document };