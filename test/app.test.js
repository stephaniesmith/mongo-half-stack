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

    it('hello world', () => {
        return chai.request(app)
            .get('/')
            .then(response => {
                assert.equal(response.text, 'hello world');
            });
    });

    it('has no gems', () => {
        assert(true);
    });

    after(() => mongo.client.close());

});