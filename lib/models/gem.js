const mongo = require('../mongodb');
const { ObjectId } = require('mongodb');

module.exports = {
    insert(gem) {
        return mongo.then(db => {
            return db.collection('gems')
                .insert(gem)
                .then(result => result.ops[0]);
        });
    },

    findAll() {
        return mongo.then(db => {
            return db.collection('gems')
                .find()
                .toArray();
        });
    },

    findOne(id) {
        return mongo.then(db => {
            return db.collection('gems')
                .find(ObjectId(id))
                .toArray();
        });
    },

    update(gem) {
        return mongo.then(db => {
            return db.collection('gems')
                .update({ _id: ObjectId(gem._id)} ,{ $set: { name: gem.name, type: gem.type} });
        });
    }
};