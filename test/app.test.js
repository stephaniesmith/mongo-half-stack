require('dotenv').config({ path: './test/.env' });
const mongo = require('../lib/mongodb');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../lib/app');

chai.use(chaiHttp);
const { assert } = chai;

describe('Gems API', () => {
    before(() => {
        return mongo.then(db => db.collection('gems').remove());
    });

    let gem = {
        name: 'garnet',
        type: 'fusion'
    };

    it.only('save a gem', () => {
        return chai.request(app)
            .post('/gems')
            .send(gem)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.equal(body.name, gem.name);
                gem = body;
            });
    });

    it('gets all gems', () => {
        return chai.request(app)
            .get('/gems')
            .then(({ body }) => {
                assert.deepEqual(body, [gem]);
            });
    });

    after(() => mongo.client.close());

});