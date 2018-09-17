'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectionString = exports.config = undefined;

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
const config = exports.config = {
  development: {
    user: process.env.testUserName,
    database: 'postgres',
    host: '127.0.0.1',
    password: process.env.devPassword,
    port: process.env.conPort
  },
  test: {
    user: process.env.testUserName,
    password: process.env.testPassword,
    database: 'postgres',
    host: '127.0.0.1',
    port: process.env.conPort
  },
  production: {
    use_env_variable: 'DATABASE_URL'
  }
};
let setConnectionString;
const env = process.env.NODE_ENV || 'development';
if (env === 'production') setConnectionString = { connectionString: process.env.DATABASE_URL, ssl: true };else setConnectionString = config[env];
const connectionString = exports.connectionString = setConnectionString;