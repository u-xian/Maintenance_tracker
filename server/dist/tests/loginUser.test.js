'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.should();
_chai2.default.use(_chaiHttp2.default);
const loginUser = () => {
  describe('/POST User', () => {
    it('It should sign in user', done => {
      _chai2.default.request(_index2.default).post('/api/v1/auth/login').send({
        email: 'sinmiloluwasunday@yahoo.com', password: 'test'
      }).end((err, res) => {
        res.should.have.status(200);
        _chai.assert.equal(res.body.message, 'Login successful');
        done();
      });
    });
    it('It should not sign in user with an unexisting username ', done => {
      _chai2.default.request(_index2.default).post('/api/v1/auth/login').send({
        email: '111@yahoo.com', password: 'test'
      }).end((err, res) => {
        res.should.have.status(401);
        _chai.assert.equal(res.body.message, 'No account with this email address');
        done();
      });
    });
    it('It should not sign in user with a wrong password ', done => {
      _chai2.default.request(_index2.default).post('/api/v1/auth/login').send({
        email: 'sinmiloluwasunday@yahoo.com', password: 'testko'
      }).end((err, res) => {
        res.should.have.status(401);
        _chai.assert.equal(res.body.message, 'Invalid Password');
        done();
      });
    });
    it('It should not sign in user if missing email field', done => {
      _chai2.default.request(_index2.default).post('/api/v1/auth/login').send({
        email: '', password: 'test'
      }).end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.be.eql('Email is required');
        done();
      });
    });
    it('It should not sign in user if missing password field', done => {
      _chai2.default.request(_index2.default).post('/api/v1/auth/login').send({
        email: 'sinmi@yahoo.com', password: ''
      }).end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.be.eql('Password is required');
        done();
      });
    });
    it('It should not sign in user if email field is not a string', done => {
      _chai2.default.request(_index2.default).post('/api/v1/auth/login').send({
        firstName: 'joe', lastName: 'Love', email: 5, password: 'test'
      }).end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.be.eql('Invalid Format for email field');
        done();
      });
    });
    it('It should not sign in user if password field is not a string', done => {
      _chai2.default.request(_index2.default).post('/api/v1/auth/login').send({
        firstName: 'hello', lastName: 'Love', email: 'sinmi@yahoo.com', password: false
      }).end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.be.eql('Invalid Format for password field');
        done();
      });
    });
  });
};
exports.default = loginUser;