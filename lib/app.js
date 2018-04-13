const { parse } = require('url');
const gems = require('./routes/gems');
const notFound = require('./routes/not-found');
const bodyParser = require('./body-parser');

const routes = {
    __proto__: null,
    gems
};

module.exports = (req, res) => {

    const parsedUrl = parse(req.url, true);
    req.query = parsedUrl.query;
    req.paths = parsedUrl.pathname.slice(1).split('/');
    const key = req.paths[0];

    res.setHeader('Content-Type', 'application/json');

    const route = routes[key] || notFound;

    bodyParser(req)
        .then(body => {
            req.body = body;
            route(req, res);
        });
};