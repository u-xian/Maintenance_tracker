'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const checkName = name => {
  if (name && name.indexOf('-') !== -1) {
    let test = name;
    for (let i = 0; i < test.length; i += 1) {
      test = test.replace('-', '');
    }
    if (!_validator2.default.isAlpha(test)) {
      return true;
    }
  } else if (!_validator2.default.isAlpha(name)) {
    return true;
  }
};
exports.default = checkName;