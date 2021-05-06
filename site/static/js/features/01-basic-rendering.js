window.addEventListener('DOMContentLoaded', () => {
    let page,
        DV,
        page_html,
        div_page;

    DV = DocumentViewer;
    page = new DV.Page({id: 2});

    page_html = DV.renderman.render(
        "page.html",  // path to the template
        {'page': page}  // context
    );

    div_page = document.querySelector("#page");
    div_page.innerHTML = page_html;
});