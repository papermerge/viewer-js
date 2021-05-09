import { Collection } from "symposium";
import { Page } from "./models/index";
import { urlconf } from "./urls";


function fetch_document(doc) {
    let options,
        response,
        promise;

    options = {
        'headers': {
            'Content-Type': 'application/json'
        }
    }
    response = fetch(urlconf.document_url(doc), options).then((response) => {
        if (response.status != 200) {
            throw new Error(response.statusText);
        }
        // response.json() returns a Promise!
        return response.json();
    }).then(json_response => {
        let pages_col = new Collection(),
            pages_arr;

        pages_arr = json_response['pages'].map((item_attrs) => {
            return new Page(item_attrs);
        });
        pages_col.add(pages_arr);

        return pages_col;
    });

    return response;
}

export { fetch_document };