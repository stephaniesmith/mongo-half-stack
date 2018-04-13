module.exports = (req, res) => {
    if(req.url === '/') {
        res.end('hello world');
    }
};