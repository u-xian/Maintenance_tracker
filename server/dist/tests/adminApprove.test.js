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
const adminApprove = () => {
  describe('/PUT ADMIN', () => {
    it('It should approve a pending request', done => {
      _chai2.default.request(_index2.default).put('/api/v1/requests/7/approve').end((err, res) => {
        res.should.have.status(200);
        _chai.assert.equal(res.body.message, 'Request approved');
        done();
      });
    });
    it('It should not approve a request that is not pending', done => {
      _chai2.default.request(_index2.default).put('/api/v1/requests/1/approve').end((err, res) => {
        res.should.have.status(403);
        res.body.message.should.eql('Request has been acted upon');
        done();
      });
    });
    it('It should not approve an unexisting request', done => {
      _chai2.default.request(_index2.default).put('/api/v1/requests/6000/approve').end((err, res) => {
        res.should.have.status(404);
        _chai.assert.equal(res.body.message, 'Request not found');
        done();
      });
    });
    it('It should not process an invalid request id', done => {
      _chai2.default.request(_index2.default).put('/api/v1/requests/6uiui/approve').end((err, res) => {
        res.should.have.status(400);
        _chai.assert.equal(res.body.message, 'Invalid ID');
        done();
      });
    });
  });
};
exports.default = adminApprove;