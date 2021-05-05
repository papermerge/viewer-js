import { Model, Collection } from "symposium";

import { fetch_children } from "../requests";


class Panel extends Model {
    /**
     * Panel is a collection of nodes.
     *
     * Panel responsability is to manage nodes (Documents and Folder) i.e.
     * add/remove/refresh and notify integrested parties with relevent events.
     *
     */
    constructor(
        nodes=new Collection()
    ) {
        super();
        let that = this;

        this.nodes = nodes;
        this.nodes.on("change", function(){ that.trigger("change") } );
    }

    toString() {
        return `Panel(nodes=${this.nodes}`;
    }

    reset(node_or_nodes) {
        // add one or more nodes
        this.nodes.reset(node_or_nodes);
    }

    remove(node_or_nodes) {
        // remove one or more nodes
        this.nodes.remove(node_or_nodes);
    }

    get_node({
        id,
        title
    }) {
        return this.nodes.get({id, title});
    }

    get_selection() {
        let selection;

        selection = this.nodes.filter(
            (node) => { return node.is_selected; }
        );

        return selection;
    }

    reset(nodes) {
        // empties `this.nodes` collection and fills it anew with
        // provides `nodes`.
        this.nodes.reset(nodes);
    }

    set_nodes_attr(key, value) {
        this.nodes.map((node) => {node[key] = value;});
        this.nodes.trigger("change");
    }

}

export { Panel };