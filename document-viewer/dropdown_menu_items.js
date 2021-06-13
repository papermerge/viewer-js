import { DropdownItem } from "./models/dropdown_item";


let dropdown_menu_items = [
    new DropdownItem({
        title: 'Thumbnails',
        value: 'thumbnails',
        is_checked: true
    }),
    new DropdownItem({
        title: 'Details',
        value: 'details',
        is_checked: true
    })
];

export { dropdown_menu_items };