window.addEventListener('DOMContentLoaded', () => {
    let DV = DocumentViewer,
        document_panel,
        doc,
        zoom_selector;

    DV.urlconf.prefix = '/05-zoom-in-zoom-out';

    document_panel = new DV.DocumentView({
        'pages': {
            'el': document.querySelector('.pages-panel'),
            'template_name': 'panel/pages.html',
        },
        'thumbnails': {
            'el': document.querySelector(".thumbnails-panel"),
            'template_name': 'panel/thumbnails.html'
        },
    });

    doc = new DV.Document({id: 1});
    document_panel.open(doc);

    zoom_selector = document.querySelector('.zoom');
    if (zoom_selector) {
        zoom_selector.addEventListener("change", (event) => {
            document_panel.trigger("zoom", event.target.value);
        });
    } else {
        console.log("No Zoom selector found");
    }

});