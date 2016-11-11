'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _RootReducer = require('./reducers/RootReducer');

var _RootReducer2 = _interopRequireDefault(_RootReducer);

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxLogger = require('redux-logger');

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

var _reactRedux = require('react-redux');

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import io from 'socket.io-client';

//<Router history={hashHistory}> 兼容低版本浏览器，前端路由通过＃，例如：http://localhost:8080/#/winner
// import { Router, Route, Link, hashHistory, IndexRoute } from 'react-router';
//import Voting from './components/Voting';
//与纯组件Voting不同，VotingContainer 封装了纯组件和一些逻辑用来与Redux Store协同工作，这些特性是react-redux提供的
// import AppleBasket from './containers/AppleBasket';
var loggerMiddleware = (0, _reduxLogger2.default)();
var store = (0, _redux.createStore)(_RootReducer2.default, (0, _redux.applyMiddleware)(_reduxThunk2.default, loggerMiddleware));

(0, _reactDom.render)(_react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _router2.default
), document.getElementById('app'));

//# sourceMappingURL=index.js.map