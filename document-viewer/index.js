import "./assets/scss/index.scss";

import { Collection } from "@papermerge/symposium";
import {
    Document,
    Page,
    Thumbnail,
} from "./models/index";
import {
    ThumbnailsPanelView,
    PagesPanelView,
    DocumentView
} from "./views/index";
import { renderman } from "./renderman";
import { urlconf } from "./urls";

export {
    renderman,
    Document,
    Page,
    Thumbnail,
    ThumbnailsPanelView,
    PagesPanelView,
    DocumentView,
    Collection,
    urlconf
};