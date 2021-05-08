window.addEventListener('DOMContentLoaded', () => {
    let page,
        DV,
        page_html,
        div_page,
        thumbnail,
        thumbnail_html,
        div_thumbnail;

    DV = DocumentViewer;
    page = new DV.Page({id: 2});
    thumbnail = new DV.Thumbnail({id: 2});

    page_html = DV.renderman.render(
        "page.html",  // path to the template
        {'obj': page}  // context
    );
    thumbnail_html = DV.renderman.render(
        "thumbnail.html",  // path to the template
        {'obj': thumbnail}  // context
    );

    div_page = document.querySelector("#page");
    if (div_page) {
        div_page.innerHTML = page_html;
    } else {
        alert('You forgot to add #page element');
    }

    div_thumbnail = document.querySelector("#thumbnail");
    if (div_thumbnail) {
        div_thumbnail.innerHTML = thumbnail_html;
    } else {
        alert('You forgot to add #thumbnail element');
    }
});