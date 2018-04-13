const notFound = require('./not-found');
const gem = require('../models/gem');

const post = (req, res) => {
    
};

const method = { post };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};