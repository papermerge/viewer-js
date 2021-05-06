import os

from flask import (
    Flask,
    render_template,
    send_from_directory
)
from app.browser import create_blueprint

app = Flask(__name__)

app.jinja_env.auto_reload = True

app.register_blueprint(
    create_blueprint('mini-browser', request_delay=0.2),
    url_prefix='/mini-browser'
)
app.register_blueprint(
    # Simulate slow requests. Each request will take `request_delay` seconds.
    create_blueprint('slow-quesries-browsing', request_delay=4),
    url_prefix='/slow-queries-browsing'
)
app.register_blueprint(
    create_blueprint('dual-panel-browsing', request_delay=0.4),
    url_prefix='/dual-panel-browsing'
)
app.register_blueprint(
    create_blueprint('selections-and-actions', request_delay=0.3),
    url_prefix='/selections-and-actions'
)


global_context = {
    'features': [
        {
            'url': '/01-basic-rendering',
            'title': '01 - Basic rendering'
        },
        {
            'url': '/02-basic-panel-with-pages',
            'title': '02 - Basic Panel with Pages'
        },
        {
            'url': '/mini-viewer',
            'title': 'Mini Viewer'
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


@app.route('/')
def index():
    return render_template(
        "index.html",
        **global_context
    )


@app.route('/01-basic-rendering')
def basic_rendering():
    return render_template(
        "features/01-basic-rendering.html",
        **global_context
    )


@app.route('/basic-panel-with-nodes')
def basic_panel_with_nodes():
    return render_template("features/basic-panel-with-nodes.html")


@app.route('/about')
def about():
    return render_template("about.html")


@app.route('/favicon.ico')
def favicon():
    static_path = os.path.join(app.root_path, 'static')
    return send_from_directory(
        static_path,
        'favicon.ico',
        mimetype='image/vnd.microsoft.icon'
    )
