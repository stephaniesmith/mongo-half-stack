require('dotenv').config({ path: './test/.env' });
const mongo = require('../lib/mongodb');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const { assert } = chai;

describe('Gems API', () => {
    before(() => {
        return mongo.then(db => db.collection('gems').remove());
    });

    it('has no gems', () => {
        assert(true);
    });

    after(() => mongo.client.close());

});