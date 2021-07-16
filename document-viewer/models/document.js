import { Model } from "@papermerge/symposium";

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
        return urlconf.url('document', {document_id: this.id});
    }
}

export { Document };