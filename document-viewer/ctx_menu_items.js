import { CtxMenuItem } from "symposium";

/* All functions in `ctx_menu_items` must be declared
with `function` keyword.

Don't use arrow function here!

Arrow functions don't have their `this`, they inherited it
from surrounding context.
Arrow functions remember context at the time of
definitions - a context which cannot be changed.
*/
let ctx_menu_items = [
    {
        title: 'Download',
        icon_class: 'fa fa-download',
        id: "#download",
        condition: function({selection, parent}) {
            return true;
        },
        run: function({selection, parent})  {
            console.log(`Action ${this.id}`);
            console.log(`title ${this.title}`);
            console.log(`selection = ${selection}`);
        }
    },
    {
        title: 'Delete',
        icon_class: 'fa fa-delete',
        id: "#delete",
        enabled: false,
        condition: function({selection, parent}) {
            return selection.length >= 1;
        },
        run: function({selection, parent}) {
            console.log(`Action ${this.id}`);
            console.log(`title ${this.title}`);
            console.log(`selection = ${selection}`);
        }
    },
    {
        title: 'Hello',
        icon_class: 'fa fa-edit',
        id: "#hello",
        enabled: true,
        condition: function({selection, parent}) {
            return true;
        },
        run: function({selection, parent}) {
            alert("Hello!");
        }
    },
];

ctx_menu_items = ctx_menu_items.map(
    (params) => {
        let action_item;

        action_item = new CtxMenuItem(params);
        /*
        Prepare correct context (i.e. `this` object) for
        the `run` function. `this` will point to
        action_item instance. It is possible only if
        `run` was declared using `function` keyword.
        */
        action_item.condition = action_item.condition.bind(action_item);
        action_item.run = action_item.run.bind(action_item);

        return action_item;
    }
);


export { ctx_menu_items }
