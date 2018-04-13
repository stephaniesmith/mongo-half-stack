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

    it('save a gem', () => {
        return chai.request(app)
            .post('/gems')
            .then(({ body }) => {
                assert.ok(body._id);
            });
    });

    it('gets all gems', () => {
        return chai.request(app)
            .get('/gems')
            .then(({ body }) => {
                assert.deepEqual(body, []);
            });
    });

    after(() => mongo.client.close());

});