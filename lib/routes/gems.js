const notFound = require('./not-found');
const gem = require('../models/gem');

const post = (req, res) => {
    gem.insert(req.body).then(saved => {
        res.send(saved);   
    });
};

const get = (req, res) => {
    const id = req.paths[1];
    id ? getOne(id, req, res) : getAll(req, res);
};

const getAll = (req, res) => {
    gem.findAll().then(gems => {
        res.send(gems);   
    });
};

const getOne = (id, req, res) => {
    gem.findOne(id).then(one => {
        res.send(one);   
    });
};

const methods = { post, get };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};