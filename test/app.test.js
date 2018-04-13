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
            .post(/gems)
            .then(({ body }) => {
                assert.deepEqual(body, gem);
            });
    });

    after(() => mongo.client.close());

});