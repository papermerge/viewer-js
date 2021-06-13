import { View } from "@papermerge/symposium";
import { renderman } from "../renderman";

class DropdownMenuView extends View {

    constructor({collection, options}) {
        super(options);

        this.thumbnails_visible = true;
        this.details_visible = true;
    }

    get default_template_name() {
        return "templates/dropdown_menu.html";
    }

    get default_template_engine() {
        return renderman;
    }

    events() {
        let event_map;

        event_map = {
            'click a.dropdown-item': 'on_click'
        }

        return event_map;
    }

    on_click(event) {
        let target = event.currentTarget;

        console.log(target.dataset.value);
    }
}

export { DropdownMenuView };