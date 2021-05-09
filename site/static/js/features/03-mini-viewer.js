window.addEventListener('DOMContentLoaded', () => {
    let DV = DocumentViewer,
        document_panel,
        doc;

    DV.urlconf.prefix = '/03-mini-viewer';

    document_panel = new DV.DocumentPanelView({
        'pages': {
            'el': document.querySelector('#pages_panel'),
            'template_name': 'panel/pages.html'
        },
        'thumbnails': {
            'el': document.querySelector("#thumbnails_panel"),
            'template_name': 'panel/thumbnails.html'
        },
    });

    doc = new DV.Document({id: 1});
    document_panel.initial_fetch(doc);
});