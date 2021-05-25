window.addEventListener('DOMContentLoaded', () => {
    let DV = DocumentViewer,
        document_panel,
        doc;

    DV.urlconf.prefix = '/04-slow-queries';

    document_panel = new DV.DocumentView({
        'pages': {
            'el': document.querySelector('.pages-panel'),
            'template_name': 'panel/pages.html'
        },
        'thumbnails': {
            'el': document.querySelector(".thumbnails-panel"),
            'template_name': 'panel/thumbnails.html'
        },
    });

    doc = new DV.Document({id: 1});
    document_panel.open(doc);
});