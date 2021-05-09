window.addEventListener('DOMContentLoaded', () => {
    let DV = DocumentViewer,
        document_panel,
        doc;

    DV.urlconf.prefix = '/mini-viewer';

    document_panel = new DV.DocumentPanelView({
        'pages': {'el': document.querySelector('#pages')},
        'thumbnails': {'el': document.querySelector("#thumbnails")},
    });

    doc = new DV.Document({id: 1});
    document_panel.initial_fetch(doc);
});