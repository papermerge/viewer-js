import { View } from "@papermerge/symposium";
import { renderman } from "../renderman";

class DropdownMenuView extends View {

    constructor({collection, options}) {
        super(options);

        this.collection = collection;
        this.thumbnails_visible = true;
        this.details_visible = true;
    }

    get default_template_name() {
        return "templates/dropdown_menu.html";
    }

    get default_template_engine() {
        return renderman;
    }

    get default_context() {
        return {'items': this.collection};
    }

    events() {
        let event_map;

        event_map = {
            'click a.dropdown-item': 'on_click'
        }

        return event_map;
    }

    on_click(event) {
        let target = event.currentTarget,
            value,
            item,
            is_checked;

        value = target.dataset.value;

        item = this.collection.get({value});

        if (!item) {
            console.error(`Dropdown menu: item not found ${value}`);
            return;
        }

        this.trigger(
            "dropdown_menu_item_click",
            item
        );
    }
}

export { DropdownMenuView };