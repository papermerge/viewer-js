import { View } from "symposium";
import { renderman } from "../../renderman";

import {
    EV_PANEL_ITEM_SELECTED,
} from "../../events";


class PanelBaseView extends View {

    get default_options() {
        return {
            'loader_selector': '.loader',
            'el': undefined
        }
    }

    constructor({
        collection,
        options={}
    }) {
        super(options);
        this.collection = collection;
        this.options = Object.assign({}, this.default_options, options);

        this.el = this.options['el'];
    }

    events() {
        // DOM events
        let event_map = {
            "click .item > input[type=checkbox]": "on_item_selected",
            "click .item": "on_item_clicked",
        }
        return event_map;
    }

    on_item_selected(event) {
        let current_target = event.currentTarget,
            item_id,
            item,
            new_state,
            parent,
            current_selection;

        // parent is DOM element with .node class,
        // which among others contains the checkbox
        parent = current_target.parentNode;
        if (!parent) {
            console.error(`No parent defined for target ${current_target}`);
            return;
        }

        item_id = parent.dataset.id;
        if (!this.collection) {
            return;
        }
        item = this.collection.get({id: item_id});

        if (!item) {
            console.error(`Item not found for target ${current_target}`);
            return;
        }

        new_state = item.toggle_selection();
        if (new_state) {
            parent.classList.add('checked');
        } else {
            parent.classList.remove('checked');
        }

        current_selection = this.collection.filter(
            (item) => { return item.is_selected; }
        );

        this.trigger(
            EV_PANEL_ITEM_SELECTED,
            {
                item:item,
                selection:current_selection
            }
        );
    }

    on_item_clicked(event) {
        let target = event.currentTarget,
            item_id,
            item;

        if (event.target.type == "checkbox") {
            // user clicked item's checkbox, which is not the concern
            // of current event handler. Instead `on_item_selected`
            // handler will should process this event.
            return;
        }

        event.preventDefault();
        // vanilla js equivalent of $(...).data('id');
        item_id = target.dataset.id;
        if (!this.collection) {
            return;
        }
        item = this.collection.get({id: item_id});
    }

    show_loader() {
        let selector, loader;

        selector = this.options['loader_selector'];
        if (selector) {
            loader = document.querySelector(selector);

            if (loader) {
                loader.style.visibility = 'visible';
            }
        }
    }

    hide_loader() {
        let selector, loader;

        selector = this.options['loader_selector'];
        if (selector) {
            loader = document.querySelector(selector);

            if (loader) {
                loader.style.visibility = 'hidden';
            }
        }
    }

    render_to_string() {

        let html_panel = "",
            context = {};

        if (!this.collection) {
            return html_panel;
        }
        context['objects'] = this.collection;
        html_panel = renderman.render(
            this.template_name,
            context
        );

        return html_panel;
    }

    render() {
        let panel_html = this.render_to_string();

        if (this.el) {
            this.el.innerHTML = panel_html;
        }
        return panel_html;
    }
};


export { PanelBaseView };
