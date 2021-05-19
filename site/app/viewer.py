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
            'url': '/04-slow-queries',
            'title': '04 - Slow Queries'
        },
        {
            'url': '/05-zoom-in-zoom-out',
            'title': '05 - Zoom In/Zoom Out'
        },
        {
            'url': '/06-selections-and-actions',
            'title': '06 - Selections and Actions'
        }
    ]
}


def _get_template_name(req):
    name_with_slashes = req.url_rule.rule
    template_name = name_with_slashes.split('/')[1]

    return f"{template_name}.html"


def _folder_abs_path(folder_name):
    """
    Returns absolute path given folder name.

    Example:

    _folder_abs_path("static") => absolute path to static folder
    _folder_abs_path("media")  => absolute path to media folder
    """
    abs_path = os.path.join(
        os.path.dirname(__file__),
        '..',
        folder_name
    )

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


def page_svg(page_id):
    """
    Returns the SVG image (XML SVG content) of given page_id.

    It reads SVG file from media folder.
    """
    abs_path = _folder_abs_path("media")
    svg_file_path = os.path.join(
        abs_path,
        "document-1",
        f"page-{page_id}.svg"
    )

    # We have absolute path to the SVG file.
    # Now just read the actual file content.
    content = ""
    with open(svg_file_path, "r") as f:
        content = f.read()

    return content


def create_blueprint(name, request_delay=0):
    """
    Create a blueprint with options.

    A blueprint, in flask sense, is a reusable app in django's sense.
    `request_delay` is the number of seconds to delay handling of the
    request. With `request_delay` > 0 we simulate slow requests.
    """

    # Reusable app. It provides views for following URLS:
    #  - /
    #  - /document/<int:document_id>
    #  - /page/<int:page_id>
    blueprint = Blueprint(
        name,  # unique name
        name,  # import_name
        template_folder='templates',  # same folder as for the main app
        static_folder=_folder_abs_path("static")  # same as for main app

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

    @blueprint.route('/page/<int:page_id>')
    def browser_page(page_id):

        time.sleep(request_delay)
        content_type = request.headers.get('Content-Type')
        if content_type and content_type == 'image/svg+xml':
            return page_svg(page_id)

        return render_template("404.html"), 404

    return blueprint
