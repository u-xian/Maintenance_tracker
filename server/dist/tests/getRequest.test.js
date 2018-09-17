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
const getRequest = () => {
  describe('/GET Request', () => {
    it('It should get all requests', done => {
      _chai2.default.request(_index2.default).get('/api/v1/users/requests').end((err, res) => {
        res.should.have.status(200);
        _chai.assert.isArray(res.body.data, 'The response is type Array');
        done();
      });
    });
    it('It should filter request by status approved', done => {
      _chai2.default.request(_index2.default).get('/api/v1/users/requests?status= approved').end((err, res) => {
        res.should.have.status(200);
        _chai.assert.isArray(res.body.data, 'The response is type Array');
        _chai.assert.equal(res.body.data[0].status, 'approved');
        _chai.assert.notEqual(res.body.data[1].status, 'disapproved');
        done();
      });
    });
    it('It should filter request by status disapproved', done => {
      _chai2.default.request(_index2.default).get('/api/v1/users/requests?status=disapproved').end((err, res) => {
        res.should.have.status(200);
        _chai.assert.isArray(res.body.data, 'The response is type Array');
        _chai.assert.equal(res.body.data[0].status, 'disapproved');
        _chai.assert.notEqual(res.body.data[1].status, 'approved');
        done();
      });
    });
    it('It should filter request by status resolved', done => {
      _chai2.default.request(_index2.default).get('/api/v1/users/requests?status=resolved').end((err, res) => {
        res.should.have.status(200);
        _chai.assert.isArray(res.body.data, 'The response is type Array');
        _chai.assert.equal(res.body.data[0].status, 'resolved');
        _chai.assert.notEqual(res.body.data[1].status, 'approved');
        done();
      });
    });
    it('It should filter request by category electrical', done => {
      _chai2.default.request(_index2.default).get('/api/v1/users/requests?category=electrical').end((err, res) => {
        res.should.have.status(200);
        _chai.assert.isArray(res.body.data, 'The response is type Array');
        _chai.assert.equal(res.body.data[0].category, 'electrical');
        _chai.assert.notEqual(res.body.data[1].category, 'mechanical');
        done();
      });
    });
    it('It should get a single Business', done => {
      _chai2.default.request(_index2.default).get('/api/v1/users/requests/1').end((err, res) => {
        res.should.have.status(200);
        res.body.data.id.should.eql(1);
        _chai.assert.isObject(res.body.data, 'The response is object');
        done();
      });
    });
    it('It should return Not found for an invalid Id', done => {
      _chai2.default.request(_index2.default).get('/api/v1/users/requests/900000').end((err, res) => {
        res.should.have.status(404);
        res.body.message.should.eql('Request not found');
        done();
      });
    });
    it('It should NOT process an invalid Request ID', done => {
      _chai2.default.request(_index2.default).get('/api/v1/users/requests/tuuy').end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.be.eql('Invalid ID');
        done();
      });
    });
  });
};
exports.default = getRequest;