window.addEventListener('DOMContentLoaded', () => {
    let DV = DocumentViewer,
        viewer1,
        viewer2,
        doc,
        breadcrumb;

    DV.urlconf.prefix = '/07-default-templates';
    breadcrumb = new DV.Collection();

    breadcrumb.add(new DV.Folder({id: 4, title: "My Documents"}));
    breadcrumb.add(new DV.Folder({id: 5, title: "My Invoices"}));

    doc = new DV.Document({id: 1, title: "Blah blah.pdf"});
    breadcrumb.add(doc);

    viewer1 = new DV.DocumentView({'el': "#viewer1"});

    viewer1.open({doc, breadcrumb});

    viewer2 = new DV.DocumentView({'el': "#viewer2"});

    viewer2.open({doc, breadcrumb});
});