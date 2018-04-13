const mongo = require('../mongodb');

module.exports = {
    insert(gem) {
        return mongo.then(db => {
            db.collection('gems').insert(gem);
        });
    }
};