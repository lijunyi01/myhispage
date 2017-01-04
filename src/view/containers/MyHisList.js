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

var _ProjectsListItem = require('../components/ProjectsListItem');

var _ProjectsListItem2 = _interopRequireDefault(_ProjectsListItem);

var _myHisListAction_creators = require('../../actions/myHisListAction_creators');

var _myHisListAction_creators2 = _interopRequireDefault(_myHisListAction_creators);

var _redux = require('redux');

var _reactBootstrap = require('react-bootstrap');

var _AddProjectModal = require('../components/AddProjectModal');

var _AddProjectModal2 = _interopRequireDefault(_AddProjectModal);

var _ConfirmModal = require('../components/ConfirmModal');

var _ConfirmModal2 = _interopRequireDefault(_ConfirmModal);

var _ResultModal = require('../components/ResultModal');

var _ResultModal2 = _interopRequireDefault(_ResultModal);

var _AddItemModal = require('../components/AddItemModal');

var _AddItemModal2 = _interopRequireDefault(_AddItemModal);

var _MyCanvas = require('../components/MyCanvas');

var _MyCanvas2 = _interopRequireDefault(_MyCanvas);

var _ItemInMain = require('../components/ItemInMain');

var _ItemInMain2 = _interopRequireDefault(_ItemInMain);

var _ItemInMainR = require('../components/ItemInMainR');

var _ItemInMainR2 = _interopRequireDefault(_ItemInMainR);

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

            if (containerState.projectsList.length == 0 && containerState.justLogin == true) {
                actioncreator.getAllProjects();
            }

            var ileft = 0;

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
                            'div',
                            { className: _MyHisList2.default.infoarea },
                            _react2.default.createElement(
                                'p',
                                null,
                                '我的笔记'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: _MyHisList2.default.buttonarea },
                            _react2.default.createElement('div', { className: _MyHisList2.default.button1 }),
                            _react2.default.createElement('div', { className: _MyHisList2.default.button1 }),
                            _react2.default.createElement('div', { className: _MyHisList2.default.button1 }),
                            _react2.default.createElement(
                                'div',
                                { className: _MyHisList2.default.button1 },
                                _react2.default.createElement(
                                    _reactBootstrap.Button,
                                    { bsSize: 'sm', bsStyle: 'success', onClick: actioncreator.addProjectButtonClick },
                                    '新建笔记'
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: _MyHisList2.default.bottom },
                        containerState.projectsList.length > 0 ? containerState.projectsList.map(function (project) {
                            return _react2.default.createElement(_ProjectsListItem2.default, { key: project.id, componentState: project, activeId: containerState.activeId,
                                actions: { getProjectContent: actioncreator.getProjectContent,
                                    deleteProj: actioncreator.deleteProj,
                                    showConfirm: actioncreator.showConfirm
                                }
                            });
                        }) : containerState.justLogin ? _react2.default.createElement(
                            'div',
                            null,
                            'loading...'
                        ) : _react2.default.createElement(
                            'div',
                            null,
                            '暂无项目,请创建'
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: _MyHisList2.default.main },
                    _react2.default.createElement(
                        'div',
                        { className: _MyHisList2.default.top },
                        _react2.default.createElement(
                            'div',
                            { className: _MyHisList2.default.top2 },
                            _react2.default.createElement('div', { className: _MyHisList2.default.info }),
                            _react2.default.createElement(
                                'div',
                                { className: _MyHisList2.default.toolbar },
                                containerState.activeId == -1 ? _react2.default.createElement(
                                    _reactBootstrap.ButtonToolbar,
                                    null,
                                    _react2.default.createElement(
                                        _reactBootstrap.Button,
                                        { bsSize: 'sm', bsStyle: 'success', disabled: true },
                                        '新增事件'
                                    )
                                ) : _react2.default.createElement(
                                    _reactBootstrap.ButtonToolbar,
                                    null,
                                    _react2.default.createElement(
                                        _reactBootstrap.Button,
                                        { bsSize: 'sm', bsStyle: 'success',
                                            onClick: function onClick() {
                                                return actioncreator.addItemButtonClick(containerState.activeId);
                                            } },
                                        '新增事件'
                                    )
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: _MyHisList2.default.bottom },
                        containerState.projectContents[containerState.activeId] == undefined || containerState.projectContents[containerState.activeId].length == 0 ? _react2.default.createElement(
                            'div',
                            { className: _MyHisList2.default.bottom2empty },
                            '空空如也'
                        ) : _react2.default.createElement(
                            'div',
                            { className: _MyHisList2.default.bottom2 },
                            hasHighLevelItem(containerState.projectContents[containerState.activeId]) ? _react2.default.createElement(
                                'div',
                                { className: _MyHisList2.default.hashighlevel },
                                _react2.default.createElement(
                                    'div',
                                    { className: _MyHisList2.default.timeline },
                                    _react2.default.createElement(_MyCanvas2.default, { componentState: containerState.projectContents[containerState.activeId] })
                                ),
                                _react2.default.createElement('div', { className: _MyHisList2.default.itemsright })
                            ) : _react2.default.createElement(
                                'div',
                                { className: _MyHisList2.default.nohighlevel },
                                _react2.default.createElement(
                                    'div',
                                    { className: _MyHisList2.default.itemsleft },
                                    containerState.projectContents[containerState.activeId].map(function (item, index) {
                                        return _react2.default.createElement(_ItemInMain2.default, { key: item.itemId, componentState: item,
                                            index: index });
                                    })
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: _MyHisList2.default.timeline },
                                    _react2.default.createElement(_MyCanvas2.default, { componentState: containerState.projectContents[containerState.activeId] })
                                ),
                                _react2.default.createElement('div', { className: _MyHisList2.default.itemsright })
                            )
                        )
                    )
                ),
                _react2.default.createElement(_AddProjectModal2.default, { componentState: containerState.addProjectModal,
                    actions: { shutAddProjectModal: actioncreator.shutAddProjectModal,
                        createProj: actioncreator.createProj,
                        popAlert: actioncreator.popAlert,
                        shutSelfCheckModal: actioncreator.shutSelfCheckModal
                    }
                }),
                _react2.default.createElement(_AddItemModal2.default, { componentState: containerState.addItemModal,
                    actions: { shutAddItemModal: actioncreator.shutAddItemModal,
                        createItem: actioncreator.createItem,
                        popAlert: actioncreator.popAlert,
                        shutSelfCheckModal: actioncreator.shutSelfCheckModal,
                        changeTmRadio: actioncreator.changeTmRadio,
                        changeYearRadio: actioncreator.changeYearRadio,
                        createProjItem: actioncreator.createProjItem
                    }
                }),
                _react2.default.createElement(_ConfirmModal2.default, { componentState: containerState.confirmModal,
                    actions: {
                        shutConfirmModal: actioncreator.shutConfirmModal,
                        deleteProj: actioncreator.deleteProj
                    }

                }),
                _react2.default.createElement(_ResultModal2.default, { componentState: containerState.resultModal, actions: { shutResultModal: actioncreator.shutResultModal } })
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

function hasHighLevelItem(list) {
    var ret = false;
    for (var i = 0; i < list.length; i++) {
        if (list[i].itemLevel > 0) {
            ret = true;
            break;
        }
    }
    return ret;
}

exports.default = (0, _reactRedux.connect)(selectState, buildActionDispatcher)(MyHisList);

//# sourceMappingURL=MyHisList.js.map