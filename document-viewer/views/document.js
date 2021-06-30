import {
    CtxMenu,
    Collection,
    View
} from "@papermerge/symposium";
import { Breadcrumb } from "@papermerge/symposium";

import { renderman } from "../renderman";
import {
    EV_PANEL_ITEM_DBLCLICK,
    EV_PANEL_ITEM_CLICK,
    EV_PANEL_ITEM_SELECTED,
    EV_CTX_MENU_ITEM_CLICK
} from "@papermerge/symposium";

import { Thumbnail } from "../models/thumbnail";
import { ThumbnailsPanelView, PagesPanelView } from "./panel/index";
import { BreadcrumbView } from "./breadcrumb";
import { CtxMenuView } from "./ctx_menu";
import { DropdownMenu } from "../models/dropdown_menu";
import { DropdownMenuView } from "./dropdown_menu";

import {
    fetch_document,
    fetch_page_svg
} from "../requests";
import { ctx_menu_items } from "../ctx_menu_items";
import { dropdown_menu_items } from "../dropdown_menu_items";


class DocumentView extends View {

    constructor(options={}) {

        super(options);

        this.options = options;

        this.thumbnails_col = new Collection();
        this.pages_col = new Collection();
        this.breadcrumb_col = new Breadcrumb();
        this.ctx_menu_col = new CtxMenu();
        this.dropdown_menu_col = new DropdownMenu();
        this.thumbnails_visible = true;
    }

    get default_template_name() {
        return "templates/document.html";
    }

    get default_template_engine() {
        return renderman;
    }

    get ctx_menu_options() {
        if (this.el) {
            return {
                'el': this.el,
                'el_menu': this.el.querySelector('.ctx-menu')
            }
        }

        return this.options['ctx_menu'];
    }

    get dropdown_menu_options() {
        if (this.el) {
            return {
                'el': this.el.querySelector('.document-menu')
            }
        }

        return this.options['dropdown_menu'];
    }

    get breadcrumb_options() {
        if (this.el) {
            return {
                'el': this.el.querySelector('.breadcrumb')
            }
        }

        return this.options['breadcrumb'];
    }

    get pages_options() {
        if (this.el) {
            return {
                'el': this.el.querySelector('.pages-panel')
            }
        }

        return this.options['pages'];
    }

    get thumbnails_options() {
        if (this.el) {
            return {
                'el': this.el.querySelector('.thumbnails-panel')
            }
        }

        return this.options['thumbnails'];
    }

    get breadcrumb() {
        return this.breadcrumb_col;
    }

    create_views() {
        let that = this;

        if (this.el) {
            this.render();
        }

        if (this.el) {
            // viewer was created from its own template
            this.zoom = this.el.querySelector(".zoom");
        }

        this.thumbnails_view = new ThumbnailsPanelView({
            collection: this.thumbnails_col,
            options: this.thumbnails_options
        });

        this.dropdown_menu_view = new DropdownMenuView({
            collection: this.dropdown_menu_col,
            options: this.dropdown_menu_options
        });

        this.pages_view = new PagesPanelView({
            collection: this.pages_col,
            options: this.pages_options
        });

        this.ctx_menu_view = new CtxMenuView({
            collection: this.ctx_menu_col,
            options: this.ctx_menu_options
        });

        this.breadcrumb_view = new BreadcrumbView({
            collection: this.breadcrumb_col,
            options: this.breadcrumb_options
        });

        this.pages_col.on("change", this.on_svg_load, this);
        this.pages_col.on("reset", this.on_pages_reset, this);

        this.thumbnails_col.on("reset", this.on_thumbnails_reset, this);
        this.ctx_menu_col.on("reset", this.render_ctx_menu, this);
        this.ctx_menu_col.on("change", this.render_ctx_menu, this);

        this.dropdown_menu_col.on("reset", this.render_dropdown_menu, this);
        this.dropdown_menu_col.on("change", this.render_dropdown_menu, this);

        this.breadcrumb_col.on("reset", this.render_breadcrumb, this);
        this.breadcrumb_col.on("change-parent", this.render_breadcrumb, this);

        // events generated by user
        this.thumbnails_view.on(
            EV_PANEL_ITEM_CLICK,
            this.on_thumbnail_clicked,
            this
        );
        this.thumbnails_view.on(
            EV_PANEL_ITEM_DBLCLICK,
            this.on_thumbnail_dblclicked,
            this
        );
        this.thumbnails_view.on(
            EV_PANEL_ITEM_SELECTED,
            this.on_item_selected,
            this
        );
        this.ctx_menu_view.on(
            EV_CTX_MENU_ITEM_CLICK,
            this.on_menu_item_click,
            this
        );
        this.breadcrumb_view.on(EV_PANEL_ITEM_CLICK, this.on_panel_item_click, this);

        if (this.zoom) {
            this.zoom.addEventListener("change", (event) => {
                that.trigger("zoom", event.target.value);
            });
        }

        // zoom event sent from outside (by zoom selector)
        this.on("zoom", (zoom_value) => {
            that.pages_view.trigger("zoom", zoom_value);
        });

        this.dropdown_menu_view.on("dropdown_menu_item_click", this.dropdown_menu_item_click, this);

        this.ctx_menu_col.reset(ctx_menu_items);
        this.dropdown_menu_col.reset(dropdown_menu_items);
        console.log(dropdown_menu_items);
    }

    open({doc, breadcrumb}) {
        /*
        Opens given document.

        Parameters:

            * :doc: is models.document.Document instance.
            * :breadcrumb: is optional. If present, should an instance of
               models.document.breadcrumb.Breadcrumb (which in its turn is a
               collection).
        */
        let that = this;

        if (!doc) {
            console.log("Openning undefined document");
            return;
        }

        this.create_views();

        fetch_document(doc).then((pages) => {

            let new_thumb_col = new Collection();

            pages.forEach((page) => {
                page.document_id = doc.id;
            });

            that.pages_col.reset(pages);
            new_thumb_col = pages.map((page) => {
                return new Thumbnail({
                    id: page.id,
                    page_num: page.page_num
                });
            });
            that.thumbnails_col.reset(new_thumb_col);
            that.breadcrumb_col.reset(breadcrumb);
        }).catch((error) => {
            alert(`Error while fetching document '${doc}': ${error}`);
        });
    }

    close() {
        /*
        Removes:

            * bound event listeners
            * DOM element
        */
        if (this.pages_view) {
            this.pages_view.undelegateEvents();
            this.pages_view = undefined;
        }

        if (this.thumbnails_view) {
            this.thumbnails_view.undelegateEvents();
            this.thumbnails_view = undefined;
        }

        if (this.ctx_menu_view) {
            this.ctx_menu_view.undelegateEvents();
            this.ctx_menu_view = undefined;
        }

        if (this.breadcrumb_view) {
            this.breadcrumb_view.undelegateEvents();
            this.breadcrumb_view = undefined;
        }

        if (this.zoom) {
            this.zoom = undefined;
        }

        if (this.pages_col) {
            // removes all event listeners
            this.pages_col.off();
        }

        if (this.thumbnails_col) {
            this.thumbnails_col.off();
        }

        if ( this.el ) {
            this.el.innerHTML = "";
        }
    }

    on_svg_load(page) {
        this.pages_view.render(page);
        this.thumbnails_view.render(page);
    }

    get_selection() {
        return this.thumbnails_col.filter(
            (page) => { return page.is_selected; }
        );
    }

    on_item_selected({item, selection}) {
        this.trigger(
            EV_PANEL_ITEM_SELECTED,
            {item, selection}
        );
        this.ctx_menu_col.trigger(
            EV_PANEL_ITEM_SELECTED,
            {item, selection}
        );
    }

    on_menu_item_click(action) {
        action.run({
            selection: this.get_selection(),
        });
    }

    on_panel_item_click(node) {
        /*
        Invoked when breadcrumb item was clicked.

        Just proxy event to interested parties.
        */
        if (!node) {
            // proxy event to interested parties
            this.trigger("close-document", undefined);
        } else if (node.is_folder) {
            // proxy event to interested parties
            this.trigger("close-document", node);
        } else {
            // ignore
        }
    }

    on_thumbnail_clicked(thumbnail) {
        //console.log(`on_thumbnail_clicked ${thumbnail}`);
    }

    on_thumbnail_dblclicked(thumbnail) {
        //console.log("on_thumbnail_dblclicked");
        this.pages_view.scroll_to(thumbnail.id);
    }

    on_pages_reset() {
        this.pages_view.render();
        this.pages_col.forEach((page) => {
            fetch_page_svg(page);
        });
    }

    on_thumbnails_reset() {
        this.thumbnails_view.render();
    }

    dropdown_menu_item_click(dropdown_item) {
        dropdown_item.is_checked = !dropdown_item.is_checked;

        if (dropdown_item.is_checked) {
            this.thumbnails_view.show();
        } else {
            this.thumbnails_view.hide();
        }
    }

    render_ctx_menu() {
        this.ctx_menu_view.render();
    }

    render_dropdown_menu() {
        this.dropdown_menu_view.render();
    }

    render_breadcrumb() {
        this.breadcrumb_view.render();
    }

    reset(item_or_items) {
        this.panel_model.reset(item_or_items);
    }
}

export { DocumentView };