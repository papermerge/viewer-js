# Document Viewer

NodeJs package for (reusable) client side document viewer.


## Requirements

The core requirements for this project are NodeJs, npm (node package manager) and webpack:

* [nodejs](https://nodejs.org/en/) >= 10.24
* [npm](https://docs.npmjs.com/about-npm) >= 7.8
* [webpack](https://webpack.js.org/) >= 5.30.0

## Installation

Install all nodejs dependent packages:

    $ npm i  # looks in package.json and installs dependencies


## Playground

In `site/` folder there is a `flask` based project used as playground.
In order to setup and run playground, use following commands:

    $ cd site
    $ virtualenv .venv -p /usr/bin/python3.7
    $ source .venv/bin/activate
    $ pip install -r requirements.txt
    $ cd ..
    $ make run