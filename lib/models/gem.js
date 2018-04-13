const mongo = require('../mongodb');

module.exports = {
    insert(gem) {
        mongo.then(db => {
            db.collection('gems').insert(gem);
        });
    }
};