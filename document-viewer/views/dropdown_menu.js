import { View } from "@papermerge/symposium";
import { renderman } from "../renderman";

class DropdownMenuView extends View {

    get default_template_name() {
        return "templates/dropdown_menu.html";
    }

    get default_template_engine() {
        return renderman;
    }
}

export { DropdownMenuView };