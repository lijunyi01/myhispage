'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _MyHisList = require('../styles/MyHisList.css');

var _MyHisList2 = _interopRequireDefault(_MyHisList);

var _ProjectsList = require('../components/ProjectsList');

var _ProjectsList2 = _interopRequireDefault(_ProjectsList);

var _myHisListAction_creators = require('../../actions/myHisListAction_creators');

var _myHisListAction_creators2 = _interopRequireDefault(_myHisListAction_creators);

var _redux = require('redux');

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import PureRenderMixin from 'react-addons-pure-render-mixin';
// import { render } from 'react-dom';

var MyHisList = function (_React$Component) {
    _inherits(MyHisList, _React$Component);

    function MyHisList() {
        _classCallCheck(this, MyHisList);

        return _possibleConstructorReturn(this, (MyHisList.__proto__ || Object.getPrototypeOf(MyHisList)).apply(this, arguments));
    }

    _createClass(MyHisList, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps) {
            return nextProps.containerState != this.props.containerState;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                containerState = _props.containerState,
                actioncreator = _props.actioncreator;

            if (containerState.projectsList.length == 0) {
                actioncreator.getAllProjects();
            }

            return _react2.default.createElement(
                'div',
                { className: _MyHisList2.default.myHisListMain },
                _react2.default.createElement(
                    'div',
                    { className: _MyHisList2.default.list },
                    _react2.default.createElement(
                        'div',
                        { className: _MyHisList2.default.top },
                        _react2.default.createElement(
                            'p',
                            null,
                            '我的笔记'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: _MyHisList2.default.bottom },
                        containerState.projectsList.map(function (project) {
                            return _react2.default.createElement(_ProjectsList2.default, { key: project.id, componentState: project, activeId: containerState.activeId, actions: { getProjectContent: actioncreator.getProjectContent } });
                        })
                    )
                ),
                _react2.default.createElement('div', { className: _MyHisList2.default.main })
            );
        }
    }]);

    return MyHisList;
}(_react2.default.Component);

function selectState(state) {
    return {
        containerState: state.myHisListState
    };
}

function buildActionDispatcher(dispatch) {
    return {
        actioncreator: (0, _redux.bindActionCreators)(_myHisListAction_creators2.default, dispatch)
    };
}

exports.default = (0, _reactRedux.connect)(selectState, buildActionDispatcher)(MyHisList);

//# sourceMappingURL=MyHisList.js.map