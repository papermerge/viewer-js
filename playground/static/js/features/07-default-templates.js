window.addEventListener('DOMContentLoaded', () => {
    let DV = DocumentViewer,
        viewer1,
        viewer2,
        doc;

    DV.urlconf.prefix = '/07-default-templates';

    doc = new DV.Document({id: 1, title: "Blah blah.pdf"});

    viewer1 = new DV.DocumentView({'el': "#viewer1"});

    viewer1.open(doc);

    viewer2 = new DV.DocumentView({'el': "#viewer2"});

    viewer2.open(doc);
});