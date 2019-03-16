/* eslint-disable no-undef */
/* eslint-disable prefer-destructuring */
import { expect } from 'chai';
import { describe } from 'mocha';
import bcrypt from 'bcrypt';
import supertest from 'supertest';
import server from '../../server';
import db from '../models/db';


const api = supertest(server);
let token;


async function createAdmin() {
  const query = `INSERT INTO users(firstName, lastname, email, password, isAdmin, phonenumber)
    VALUES($1, $2, $3, $4, $5, $6) RETURNING email, firstname, lastname, id`;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('123def', salt);
  const values = ['Julius', 'Ngwu', 'julius@gmail.com', hashedPassword, true, '08109983465'];
  return db.query(query, values);
}


async function clearTable() {
  const query = 'DELETE FROM users';
  return db.query(query);
}

describe('tests for office controller', () => {
  before(async () => {
    await clearTable();
    await createAdmin();
  });
  it('should get login and return admin token', (done) => {
    const user = {
      email: 'julius@gmail.com',
      password: '123def',
    };
    api.post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        token = res.body.data.token;
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('status');
        expect(res.body.status).to.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('token');
        expect(res.body.data).to.have.property('user');
        expect(res.header).to.have.property('x-auth-token');
        done();
      });
  });
  describe('/POST create office', () => {
    it('should create a new office', (done) => {
      const office = {
        name: 'Governor',
        type: 'state',
      };
      api.post('/api/v1/offices')
        .set('x-auth-token', token)
        .send(office)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(201);
          expect(res.body).to.have.property('data');
          done();
        });
    });
    it('should fail to create a new office', (done) => {
      const office = {
        type: 'state',
      };
      api.post('/api/v1/offices')
        .set('x-auth-token', token)
        .send(office)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error[0]).to.equal('name must contain only alphabets');
          done();
        });
    });
  });

  describe(' Get /offices', () => {
    it('should get all offices', (done) => {
      api.get('/api/v1/offices')
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
  describe(' Get /offices/:id', () => {
    it('should get one office', (done) => {
      api.get('/api/v1/offices/1')
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
      api.get('/api/v1/offices/2k')
        .set('x-auth-token', token)
        .expect(400)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('id must be a positive integer');
          expect(res.body.status).to.equal(400);
          done();
        });
    });
  });
});
