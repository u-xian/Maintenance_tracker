'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('util');

const isStringValidator = (req, res) => {
  let error = false;
  Object.keys(req.body).forEach(key => {
    if (!(0, _util.isString)(req.body[key])) {
      error = true;
      return res.status(400).json({ message: `Invalid Format for ${key} field` });
    }
  });
  if (error) return true;
};
exports.default = isStringValidator;