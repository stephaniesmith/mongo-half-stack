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

    let garnet = {
        name: 'garnet',
        type: 'fusion'
    };

    let steven = {
        name: 'steven',
        type: 'human/quartz'
    };

    let pink = {
        name: 'pink dimond',
        type: 'dimond/shattered?'
    };

    it('save a gem', () => {
        return chai.request(app)
            .post('/gems')
            .send(garnet)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.equal(body.name, garnet.name);
                garnet = body;
            });
    });

    it('gets all gems', () => {
        return chai.request(app)
            .post('/gems')
            .send(steven)
            .then(({ body }) => {
                steven = body;
                return chai.request(app)
                    .get('/gems')
                    .then(({ body }) => {
                        assert.deepEqual(body, [garnet, steven]);
                    });
            });

    });

    it('get one gem', () => {
        return chai.request(app)
            .get(`/gems/${garnet._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, [garnet]);
            });
    });

    it('update gem by id', () => {
        steven.type = 'rose quartz??';
        return chai.request(app)
            .put(`/gems/${steven._id}`)
            .send(steven)
            .then(() => {
                return chai.request(app)
                    .get(`/gems/${steven._id}`)
                    .then(({ body }) => {
                        assert.deepEqual(body, [steven]);
                    });
            });
    });

    it('remove gem by id', () => {
        return chai.request(app)
            .post('/gems')
            .send(pink)
            .then(({ body }) => {
                pink = body;
                return chai.request(app)
                    .del(`/gems/${pink._id}`)
                    .then(() => {
                        return chai.request(app)
                            .get('/gems')
                            .then(({ body }) => {
                                assert.deepEqual(body, [garnet, steven]);
                            });
                    });
            });
    });

    after(() => mongo.client.close());

});