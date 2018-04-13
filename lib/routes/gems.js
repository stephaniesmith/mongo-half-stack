const notFound = require('./not-found');
const gem = require('../models/gem');

const post = (req, res) => {
    gem.insert(req.body).then(saved => {
        res.send(saved);
    });
};

const methods = { post };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};