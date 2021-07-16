import { Collection } from "@papermerge/symposium";
import { Page, Document } from "./models/index";
import { urlconf } from "./urls";


function fetch_document(doc) {
    let options,
        response,
        promise,
        url;

    if (!doc instanceof Document) {
        throw new ValueError("Input is not instance of Document");
    }

    options = {
        'headers': {
            'Content-Type': 'application/json'
        }
    }
    url = urlconf.url('document', {document_id: doc.id});

    response = fetch(url, options).then((response) => {
        if (response.status != 200) {
            throw new Error(response.statusText);
        }
        // response.json() returns a Promise!
        return response.json();
    }).then(json_response => {
        let pages_col = new Collection(),
            pages_arr;

        pages_arr = json_response['document']['pages'].map((item_attrs) => {
            return new Page(item_attrs);
        });
        pages_col.add(pages_arr);

        return pages_col;
    });

    return response;
}

function fetch_page_svg(page) {
    let response,
        url,
        options;

    if (!page instanceof Page) {
        throw new ValueError("Input is not instance of Page");
    }

    options = {
        'headers': {
            'Content-Type': 'image/svg+xml'
        }
    }

    url = urlconf.url('document_page', {
        document_id: page.document_id,
        page_num: page.page_num
    });

    response = fetch(url, options).then((response) => {
        if (response.status != 200) {
            throw new Error(response.statusText);
        }
        // response.text() returns a Promise!
        return response.text();
    }).then((response) => {
        page.svg_image = response;
    });
}

export { fetch_document, fetch_page_svg};