'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const queryValidator = value => {
  value = value.toLowerCase();
  value = _validator2.default.trim(value);
  return value;
};
exports.default = queryValidator;