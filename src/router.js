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

var _AddHisProj = require('./view/containers/AddHisProj');

var _AddHisProj2 = _interopRequireDefault(_AddHisProj);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Layout
exports.default = _react2.default.createElement(
    _reactRouter.Router,
    { history: _reactRouter.browserHistory },
    _react2.default.createElement(
        _reactRouter.Route,
        { component: _mainLayout2.default },
        _react2.default.createElement(_reactRouter.Route, { path: '/', component: _Home2.default }),
        _react2.default.createElement(
            _reactRouter.Route,
            { path: '/myHisList' },
            _react2.default.createElement(_reactRouter.IndexRoute, { component: _MyHisList2.default })
        ),
        _react2.default.createElement(
            _reactRouter.Route,
            { path: '/addHisProj' },
            _react2.default.createElement(_reactRouter.IndexRoute, { component: _AddHisProj2.default })
        )
    )
);
// Pages or Containers

//# sourceMappingURL=router.js.map