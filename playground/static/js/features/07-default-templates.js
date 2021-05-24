window.addEventListener('DOMContentLoaded', () => {
    let DV = DocumentViewer,
        viewer1,
        viewer2,
        doc;

    DV.urlconf.prefix = '/07-default-templates';

    viewer1 = new DV.DocumentView({'el': "#viewer1"});

    viewer1.open({id: 1});

    viewer2 = new DV.DocumentView({'el': "#viewer2"});

    viewer2.open({id: 1});
});