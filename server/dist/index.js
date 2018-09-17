'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _swaggerUiExpress = require('swagger-ui-express');

var _swaggerUiExpress2 = _interopRequireDefault(_swaggerUiExpress);

var _requestRoute = require('./routes/requestRoute');

var _requestRoute2 = _interopRequireDefault(_requestRoute);

var _userRoute = require('./routes/userRoute');

var _userRoute2 = _interopRequireDefault(_userRoute);

var _adminRoute = require('./routes/adminRoute');

var _adminRoute2 = _interopRequireDefault(_adminRoute);

var _swagger = require('../../swagger.json');

var _swagger2 = _interopRequireDefault(_swagger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const port = parseInt(process.env.PORT, 10) || 8000;
const app = (0, _express2.default)();
_dotenv2.default.config();
app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use('/', _express2.default.static('client'));
app.all('/api/v1/', (req, res) => res.status(200).send({
  message: 'Welcome to M-Tracker.com, we handle repair or maintenance request the finest and fastest way'
}));
app.use('/api-docs', _swaggerUiExpress2.default.serve, _swaggerUiExpress2.default.setup(_swagger2.default));
app.use('/api/v1/', _requestRoute2.default);
app.use('/api/v1/', _userRoute2.default);
app.use('/api/v1/', _adminRoute2.default);
app.all('*', (req, res) => res.status(404).send({
  message: 'You are not in the right place, pls input a valid endpoint'
}));
app.set('port', port);
const server = _http2.default.createServer(app);
server.listen(port);
console.info(`server running at port ${port}`);
exports.default = app;