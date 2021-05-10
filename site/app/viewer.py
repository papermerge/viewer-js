import os
import time

from flask import (
    Blueprint,
    render_template,
    request
)


global_context = {
    'features': [
        {
            'url': '/01-basic-rendering',
            'title': '01 - Basic rendering'
        },
        {
            'url': '/02-basic-panel-with-items',
            'title': '02 - Basic Panel with Items'
        },
        {
            'url': '/03-mini-viewer',
            'title': '03 - Mini Viewer'
        },
        {
            'url': '/slow-queries',
            'title': 'Slow Queries in Document Viewer'
        },
        {
            'url': '/dual-panel-viewer',
            'title': 'Dual Panel Viewer'
        },
        {
            'url': '/selections-and-actions',
            'title': 'Selections and Actions'
        }
    ]
}


def _get_template_name(req):
    name_with_slashes = req.url_rule.rule
    template_name = name_with_slashes.split('/')[1]

    return f"{template_name}.html"


def _static_folder_abs_path():
    """
    Returns absolute path to the static folder.
    Static folder is same as the one used by the app.
    """
    abs_path = os.path.join(os.path.dirname(__file__), '..', 'static')
    return abs_path


# Mocks server resonses for GET /document/<int:document_id>
DOCUMENT = {
    1: {
        'pages': [
            {
                'id': 1,
                'page_num': 1
            },
            {
                'id': 2,
                'page_num': 2
            },
            {
                'id': 3,
                'page_num': 3
            },
            {
                'id': 4,
                'page_num': 4
            }
        ],  # pages
    },
}


def create_blueprint(name, request_delay=0):
    """
    Create a blueprint with options.

    A blueprint, in flask sense, is a reusable app in django's sense.
    `request_delay` is the number of seconds to delay handling of the
    request. With `request_delay` > 0 we simulate slow requests.
    """

    # Reusable app. It provides views for following URLS:
    #  - /
    #  - /document/<int:node_id>
    blueprint = Blueprint(
        name,  # unique name
        name,  # import_name
        template_folder='templates',  # same folder as for the main app
        static_folder=_static_folder_abs_path()  # same as for main app

    )

    @blueprint.route('/')
    def viewer():
        template_name = f"features/{_get_template_name(request)}"
        time.sleep(request_delay)
        return render_template(
            template_name,
            **global_context
        )

    @blueprint.route('/document/<int:document_id>')
    def browser_document(document_id):
        time.sleep(request_delay)
        template_name = f"features/{_get_template_name(request)}"
        document_dict = DOCUMENT.get(document_id, None)

        if not document_dict:
            return render_template("404.html"), 404

        content_type = request.headers.get('Content-Type')
        if content_type and content_type == 'application/json':
            return document_dict

        return render_template(
            template_name,
            **document_dict
        )

    return blueprint
