import { Collection, Model  } from "symposium";


class Breadcrumb extends Model {
    /**
    Breadcrumb indicates the current browsing’s location
    within a navigational hierarchy.

    Example:

    / Home / My Documents / Payments / Invoices

    Breadcrumb model is represented by an collection of Folder models.
    The leftmost folder in the breadcrumb is called root Folder (in example
    above /Home/ folder is the root folder).
    The rightmost folder in thr breadcrumb is called parent Folder (in example
    above /Invoices/ is parent folder).
    If breadcrumb is regarded as an array then folders closer to
    the root have lower indexes:

    Breadcrumb:               / Home / My Documents / Payments / Invoices

    Collection node indexes:  undefined / 0 / 1 / 2
    Notice that there is no node for root folder, which means that
    breadcrumb with 4 items (see example above), collection will
    have 3 folders:
        Folder(title=My Documents) - with index 0
        Folder(title=Payments) - with index 1
        Folder(title=Invoices) - with index 2

    First item in breadcrumb (My Documents) is accessible via first() method.
    Last item in breadcrumb (Invoices) is accessible via last() method.
    */

    constructor(nodes=new Collection()) {
        super();
        let that = this;

        this.nodes = nodes;

        // propagate `change` events form
        // `this.nodes` collection via `this` model upwards
        // to the interested parties.
        this.nodes.on(
            "change",
            () => { that.trigger("change"); }
        );
    }

    reset(ancestors) {
        this.nodes.reset(ancestors);
    }

    change_parent(folder) {
        /**
        Change breadcrumb's parent folder.

        From collection of nodes point of view, this means to set given as
        argument folder the last one in collection.

        If given folder is `undefined` - means the whole node's collection
        will be emptied. From user point of view - he/she chose to navigate
        to the root folder.

        If given folder is not equal to any of the nodes present in collection
        then - it means that use chose to navigate one folder "deeper".

        If given folder matches one of the nodes from `this.nodes` collection
        it means that user clicked on intermediary navigation path on the
        breadcrumb - in this case we need to throw away whatever breadcrumb
        elements were after given folder.
        */
        let found,
            index,
            col,
            that = this;

        if (!folder) {
            // will trigger `change` event on the `nodes` collection
            this.nodes.reset([]);
            return;
        }
        // at this point `folder` is defined
        found = this.nodes.get(folder);
        if (!found) {
            this.nodes.push(folder);
            this.trigger("change");
            return;
        }

        // change parent to one of existing ancestors
        index = this.nodes.findIndex(
            (node) => { return node.id == folder.id; }
        )

        if (index >= 0) {
            // In javascrit, you can assign value to array's `length` property;
            // by doing so, array automatically trimms all items outside
            // array's length. Here we use this particular javascript weirdness
            // to our own advantage.
            this.nodes.length = index + 1;
        }
        this.trigger("change");
    }

    get length() {
        return this.nodes.length;
    }

    first() {
        return this.nodes.first();
    }

    last() {
        return this.nodes.last();
    }

    get parent() {
        /**
        Rightmost folder in breadcrumb is called `parent` folder. Parent folder
        is the most recent ancestor of documents and folders of the user's current
        browsing location.
        */
        return this.nodes.last();
    }
}

export { Breadcrumb };