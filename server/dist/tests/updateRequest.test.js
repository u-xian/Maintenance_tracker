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
const updateRequest = () => {
  describe('/PUT Request', () => {
    it('It should modify a Request', done => {
      _chai2.default.request(_index2.default).put('/api/v1/users/requests/3').send({
        title: 'Faulty Fan',
        description: 'We have two faulty fans now'
      }).end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.be.eql('Request Updated Successfully');
        done();
      });
    });
    it('It should NOT process an invalid Request ID', done => {
      _chai2.default.request(_index2.default).put('/api/v1/users/requests/tuuy').send({
        title: 'Faulty fan',
        description: 'we have faults'
      }).end((err, res) => {
        res.should.have.status(400);
        res.body.message.should.be.eql('Invalid ID');
        done();
      });
    });
    it('It should NOT process a non-existing Request ID', done => {
      _chai2.default.request(_index2.default).put('/api/v1/users/requests/9000000').send({
        title: 'Bad fault',
        description: 'we have no fault actually just testing'
      }).end((err, res) => {
        res.should.have.status(404);
        res.body.message.should.be.eql('Request not found');
        done();
      });
    });
    it('It should NOT update if status is approved', done => {
      _chai2.default.request(_index2.default).put('/api/v1/users/requests/1').send({
        title: 'faulty request',
        description: 'we have a fault we have a fault we have a fault'
      }).end((err, res) => {
        res.should.have.status(403);
        res.body.message.should.be.eql('Request is already approved');
        done();
      });
    });
  });
};
exports.default = updateRequest;