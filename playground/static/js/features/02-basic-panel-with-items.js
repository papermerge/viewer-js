window.addEventListener('DOMContentLoaded', () => {
    let DV,
    thumbnails,
    thumbnails_panel,
    thumbnails_panel_html,
    thumbnails_panel_view,
    pages,
    pages_panel,
    pages_panel_view,
    pages_panel_html;

    DV = DocumentViewer;

    thumbnails = new DV.Collection();
    thumbnails.add([
        new DV.Thumbnail({id: 1, page_num: 1, loading: false}),
        new DV.Thumbnail({id: 2, page_num: 2, loading: false}),
        new DV.Thumbnail({id: 3, page_num: 3, loading: false})
    ]);
    thumbnails_panel_view = new DV.ThumbnailsPanelView({
        collection: thumbnails,
        options: {
            'template_name': 'templates/panel/thumbnails.html'
        }
    });

    pages = new DV.Collection();
    pages.add([
        new DV.Page({id: 1, page_num: 1, loading: false}),
        new DV.Page({id: 2, page_num: 2, loading: false}),
        new DV.Page({id: 3, page_num: 3, loading: false})
    ]);
    pages_panel_view = new DV.PagesPanelView({
        collection: pages,
        options: {
            'template_name': 'templates/panel/pages.html'
        }
    });

    pages_panel_html = pages_panel_view.render();
    thumbnails_panel_html = thumbnails_panel_view.render();

    document.querySelector("#thumbnails-panel").innerHTML = thumbnails_panel_html;
    document.querySelector("#pages-panel").innerHTML = pages_panel_html;
});