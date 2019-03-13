/* eslint-disable prefer-destructuring */
import { expect } from 'chai';
import { describe } from 'mocha';
import supertest from 'supertest';
import server from '../../server';

const api = supertest(server);
let token;
describe('tests for party controller', () => {
  // describe('/POST create party', () => {
  //   it('should create a new party', (done) => {
  //     const party = {
  //       name: 'apc',
  //       hqAddress: 'Anambra',
  //       logoUrl: 'www.party.pnp',
  //     };
  //     api.post('/api/v1/parties')
  //       .set('x-auth-token', token)
  //       .send(party)
  //       .end((err, res) => {
  //         expect(res.status).to.equal(201);
  //         expect(res.body).to.have.property('status');
  //         expect(res.body.status).to.equal(201);
  //         expect(res.body).to.have.property('data');
  //         done();
  //       });
  //   });
  //   it('should fail to create a new party', (done) => {
  //     const party = {
  //       hqAddress: 'Anambra',
  //       logoUrl: 'www.party.pnp',
  //     };
  //     api.post('/api/v1/parties')
  //       .set('x-auth-token', token)
  //       .send(party)
  //       .end((err, res) => {
  //         expect(res.status).to.equal(400);
  //         expect(res.body.error[0]).to.equal('name must contain only alphabets');
  //         expect(res.body.error[1]).to.equal('name must have atleast 2 characters');
  //         done();
  //       });
  //   });
  // });

  describe(' Get /parties', () => {
    it('should get all parties', (done) => {
      api.get('/api/v1/parties')
        .set('x-auth-token', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(200);
          expect(res.body).to.have.property('data');
          done();
        });
    });
  });
  describe(' Get /parties/:id', () => {
    it('should get one party', (done) => {
      api.get('/api/v1/parties/1')
        .set('x-auth-token', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('data');
          expect(res.body.status).to.equal(200);
          expect(res.body.data).to.have.property('id');
          expect(res.body.data).to.have.property('name');
          done();
        });
    });
    it('should return 400 if the id is not a number', (done) => {
      api.get('/api/v1/parties/2k')
        .set('x-auth-token', token)
        .expect(400)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('id is not a number');
          expect(res.body.status).to.equal(400);
          done();
        });
    });
  });
});
