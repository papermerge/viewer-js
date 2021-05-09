import { Collection, View } from "symposium";

import { PanelView } from "./panel/index";
import { CtxMenuView } from "./ctx_menu";
import { CtxMenu } from "../models/ctx_menu";
import { fetch_document } from "../requests";
import { default_actions } from "../default_actions";
/*
import {
    EV_DOCUMENT_CLICKED,
    EV_FOLDER_CLICKED,
    EV_NODE_SELECTED,
    EV_ACTION_CLICKED
} from "../events";
*/

class DocumentPanelView extends View {

    constructor(options={}) {

        super();
        this.thumbnails_col = new Collection();
        this.thumbnails_view = new PanelView({
            collection: this.thumbnails_col,
            options: options['thumbnails']
        });

        this.pages_col = new Collection();
        this.pages_view = new PanelView({
            collection: this.pages_col,
            options: options['pages']
        });

        this.ctx_menu_model = new CtxMenu();
        this.ctx_menu_view = new CtxMenuView({
            model: this.ctx_menu_model,
            options: options['ctx_menu']
        });
        this.options = options;

        // when a thumbnails is added, panel will be re-rendered
        this.pages_col.on("change", this.render_panel, this);
        this.ctx_menu_model.on("change", this.render_ctx_menu, this);
        // events generated by user
        // this.panel_view.on(EV_FOLDER_CLICKED, this.folder_clicked, this);
        // this.panel_view.on(EV_DOCUMENT_CLICKED, this.document_clicked, this);
        // this.panel_view.on(EV_NODE_SELECTED, this.node_selected, this);
        // this.ctx_menu_view.on(EV_ACTION_CLICKED, this.action_clicked, this);

        this.ctx_menu_model.add(default_actions);
    }

    initial_fetch(doc) {
        let that = this;

        fetch_document(doc).then((pages) => {
            that.pages_col.reset(pages);
        }).catch((error) => {
            alert(`Error while fetching document '${doc}': ${error}`);
        });
    }

    get_selection() {
        return this.thumbnails_col.filter(
            (page) => { return page.is_selected; }
        );
    }

    node_selected({node, selection}) {
        // this.trigger(EV_NODE_SELECTED, {node, selection});
        // this.ctx_menu_model.trigger(EV_NODE_SELECTED, {node, selection});
    }

    action_clicked(action) {
        action.run({
            selection: this.get_selection(),
            parent: this.get_parent()
        });
    }

    folder_clicked(folder) {
        let that = this;

        this.start_folder_clicked_feedback();
        // notice that `folder` parameter here might be `undefined`
        // (which means that user clicked the root folder).
        fetch_children(folder).then((nodes) => {
            that.panel_model.reset(nodes);
            that.stop_folder_clicked_feedback();
        }).catch((error) => {
            that.stop_folder_clicked_feedback();
            alert(`Error while fetchinf folder '${folder}': ${error}`);
        });
    }

    document_clicked(doc) {
        // Panel does not know (and rightfully so)
        // what to do when document was clicked. Just
        // inform interested parties.
        //this.trigger(EV_DOCUMENT_CLICKED, doc);
    }

    start_folder_clicked_feedback() {
        /**
         * Provies folder click UI feedback.
         *
         * There might be (long) delays bewteen folder click event and
         * actual http server side response followed by changing of the folder
         * content. To provide user an immediate feedback, this function
         * performs following:
         *
         *  1. Marks current content of the folder (i.e. all nodes) as
         *   invisible. They are still present as model objects, but
         *   invisible in DOM (not visible, but still nodes take space).
         * This marking triggers a `change` event (which in turn
         * renders the panel view).
         *
         *  2. Displays a spinner.
         */
        this.panel_model.set_nodes_attr('visible', false);
        this.panel_view.show_loader();
    }

    stop_folder_clicked_feedback() {
        this.panel_view.hide_loader();
    }

    render_panel() {
        this.pages_view.render();
        this.thumbnails_view.render();
    }

    render_ctx_menu() {
        this.ctx_menu_view.render();
    }

    reset(item_or_items) {
        this.panel_model.reset(item_or_items);
    }

}

export { DocumentPanelView };