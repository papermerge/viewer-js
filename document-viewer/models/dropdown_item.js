import { Model } from "@papermerge/symposium";


class DropdownItem extends Model {

    constructor({title, value, is_checked}) {
        super();
        this.title = title;
        this.value = value;
        this._is_checked = is_checked;
    }

    get is_checked() {
        return this._is_checked;
    }

    set is_checked(value) {
        this._is_checked = value;
        this.trigger("change");
    }

    toString() {
        let t, v, c;

        t = this.title;
        v = this.value;
        c = this.is_checked;

        return `DropdownItem(title=${t}, value=${v}, is_checked=${c})`;
    }
}

export { DropdownItem };