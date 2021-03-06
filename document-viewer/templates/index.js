import document_template from "./document.html";
import page_template from "./page.html";
import thumbnail_template from "./page_thumbnail.html";
import thumbnails_panel_template from "./panel/thumbnails.html";
import pages_panel_template from "./panel/pages.html";
import ctx_menu_template from "./ctx_menu.html";
import breadcrumb_template from "./breadcrumb.html";
import dropdown_menu_template from "./dropdown_menu.html";


// maps template_name to the actual template content
let templates_map = new Map();

templates_map.set('document.html', document_template);
templates_map.set('page.html', page_template);
templates_map.set('thumbnail.html', thumbnail_template);
templates_map.set('panel/thumbnails.html', thumbnails_panel_template);
templates_map.set('panel/pages.html', pages_panel_template);
templates_map.set('ctx_menu.html', ctx_menu_template);
templates_map.set('dropdown_menu.html', dropdown_menu_template);
templates_map.set('breadcrumb.html', breadcrumb_template);

export { templates_map };