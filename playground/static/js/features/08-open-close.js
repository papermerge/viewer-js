
function _open(viewer, doc, breadcrumb) {
    if (viewer) {
        viewer.open({doc, breadcrumb});
    }
}

function _close(viewer) {
    if (viewer) {
        viewer.close();
    }
}

function _attach_dummy(dom_id) {
    /*
    Attach a dummy element to dom_id and attach an event listener to it.
    */
    let dummy;

    dummy = document.querySelector(dom_id);

    dummy.innerHTML = '<a href="#" class="dummy">I am dummy</a>';
    dummy.querySelector('.dummy').addEventListener("click", () => {
        console.log(".dummy click");
    });
}


window.addEventListener('DOMContentLoaded', () => {
    let DV = DocumentViewer,
        viewer1,
        viewer2,
        breadcrumb,
        go,
        which_viewer,
        which_action,
        which_doc;

    DV.urlconf.prefix = '/08-open-close';

    viewer1 = new DV.DocumentView({'el': "#viewer1"});
    viewer2 = new DV.DocumentView({'el': "#viewer2"});

    // DOM references
    go = document.querySelector('#go');
    which_action = document.querySelector("#which-action");
    which_viewer = document.querySelector("#which-viewer");
    which_doc = document.querySelector("#which-doc");

    go.addEventListener('click', () => {
        let viewer, doc;

        if (which_viewer.value == "#viewer1") {
            viewer = viewer1;
        } else {
            viewer = viewer2;
        }

        if (which_doc.value == "-1") {
            doc = undefined;
        } else if (which_doc.value == "1") {
            doc = new DV.Document({id: 1, title: "Document 1.pdf"});
            breadcrumb = new DV.Collection();
            breadcrumb.add(
                new DV.Folder({id: 1, title: "My Documents"})
            );
            breadcrumb.add(doc);
        } else if (which_doc.value == "2") {
            doc = new DV.Document({id: 2, title: "Document 2.pdf"});
            breadcrumb = new DV.Collection();
            breadcrumb.add(
                new DV.Folder({id: 1, title: "My Documents"})
            );
            breadcrumb.add(doc);
        }

        if (which_action.value == "open") {
            _open(viewer, doc, breadcrumb);
        } else if ( which_action.value == "close" ) {
            _close(viewer);
        } else if (which_action.value == "insert-dummy") {
            _attach_dummy(which_viewer.value);
        }
    });

});