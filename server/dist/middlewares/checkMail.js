'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _pg = require('pg');

var _config = require('../config/config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const clientPool = new _pg.Pool(_config.connectionString);
const checkMail = (req, res, next) => {
  clientPool.connect().then(client => {
    return client.query({
      text: 'SELECT  id,firstname FROM users where email=$1',
      values: [req.body.email]
    }).then(result => {
      client.release();
      if (!result.rows[0]) return res.status(404).json({ message: 'No account with this email address' });
      const { id, firstname } = result.rows[0];
      req.body.token = _jsonwebtoken2.default.sign({ id, firstname }, process.env.secret_key, { expiresIn: '900s' });
      req.body.firstname = result.rows[0].firstname;
      next();
    }).catch(error => {
      client.release();
      res.status(500).json(error.stack);
    });
  });
};
exports.default = checkMail;