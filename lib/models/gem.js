const mongo = require('../mongodb');

module.exports = {
    insert(gem) {
        return mongo.then(db => {
            return db.collection('gems')
                .insert(gem)
                .then(result => result.ops[0]);
        });
    }
};