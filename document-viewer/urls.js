import { UrlConf, path } from "@papermerge/symposium";


let urlpatterns = [
    path('folder/(:folder_id/)', 'folder'),
    path('document/:document_id/', 'document'),
    path('document/:document_id/page/:page_num/', 'document_page')
],
prefix = '/core';

// there is only one UrlConf instance
let urlconf = new UrlConf({prefix, urlpatterns});


export { urlconf };