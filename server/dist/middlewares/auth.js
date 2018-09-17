'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const auth = (req, res, next) => {
  if (process.env.NODE_ENV === 'test') {
    req.headers['x-access-token'] = process.env.token;
  }
  return _jsonwebtoken2.default.verify(req.headers['x-access-token'], process.env.secret_key, (error, decoded) => {
    if (error) return res.status(401).send({ message: 'Authentication failed' });
    req.decoded = decoded;
    return next();
  });
};
exports.default = auth;