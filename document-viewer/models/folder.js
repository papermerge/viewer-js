import { Model } from "@papermerge/symposium";
import { urlconf } from "../urls";


class Folder extends Model {

    constructor({id, title}) {
        super();
        this.id = id;
        this.title = title;
    }

    toString() {
        return `Folder(id=${this.id}, title=${this.title}, ...)`;
    }

    get href() {
        return urlconf.url('folder', {folder_id: this.id});
    }
}

export { Folder };