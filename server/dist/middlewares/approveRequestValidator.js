'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pg = require('pg');

var _config = require('../config/config');

const clientPool = new _pg.Pool(_config.connectionString);

const approveRequestValidator = (req, res, next) => {
  clientPool.connect().then(client => {
    return client.query('SELECT * FROM requests WHERE id=$1', [parseInt(req.params.requestId, 10)]).then(result => {
      client.release();
      if (!result.rows[0]) return res.status(404).json({ message: 'Request not found' });
      if (result.rows[0].status !== 'pending') return res.status(403).json({ message: 'Request has been acted upon' });
      next();
    }).catch(error => {
      client.release();
      res.status(500).json(error.stack);
    });
  });
};
exports.default = approveRequestValidator;