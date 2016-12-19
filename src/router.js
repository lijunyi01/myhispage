'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _mainLayout = require('./view/layout/main-layout');

var _mainLayout2 = _interopRequireDefault(_mainLayout);

var _Home = require('./view/pages/Home');

var _Home2 = _interopRequireDefault(_Home);

var _MyHisList = require('./view/containers/MyHisList');

var _MyHisList2 = _interopRequireDefault(_MyHisList);

var _UserSet = require('./view/containers/UserSet');

var _UserSet2 = _interopRequireDefault(_UserSet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Layout
exports.default = _react2.default.createElement(
    _reactRouter.Router,
    { history: _reactRouter.hashHistory },
    _react2.default.createElement(
        _reactRouter.Route,
        { component: _mainLayout2.default },
        _react2.default.createElement(
            _reactRouter.Route,
            { path: '/' },
            _react2.default.createElement(_reactRouter.IndexRoute, { component: _MyHisList2.default })
        ),
        _react2.default.createElement(
            _reactRouter.Route,
            { path: '/userSet' },
            _react2.default.createElement(_reactRouter.IndexRoute, { component: _UserSet2.default })
        )
    )
);
// Pages or Containers

//# sourceMappingURL=router.js.map