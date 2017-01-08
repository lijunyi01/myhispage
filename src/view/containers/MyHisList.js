'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactDom = require('react-dom');

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import PureRenderMixin from 'react-addons-pure-render-mixin';

var itemInMainParam = {};

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
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            //延时调用
            // setTimeout(()=>{
            //     console.log("MyHisList did mount");
            // },5000);

            // setInterval(()=>{
            //     console.log("MyHisList did mount");
            // },5000);

            window.addEventListener('resize', function () {
                console.log('window resize');_this2.setCanvasWidth();
            }, false);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {

            this.setCanvasWidth();
        }
    }, {
        key: 'setCanvasWidth',
        value: function setCanvasWidth() {
            var _props = this.props,
                containerState = _props.containerState,
                actioncreator = _props.actioncreator;

            console.log("set canvas width");
            var divdom = (0, _reactDom.findDOMNode)(this.refs.canvasdiv2);
            if (divdom != undefined) {
                var specs = divdom.getBoundingClientRect();
                var canvasWidth = specs.width;
                console.log("width:" + canvasWidth);
                if (canvasWidth != containerState.canvasWidthforActiveId) {
                    actioncreator.setCanvasWidth(canvasWidth);
                }
            }
        }
    }, {
        key: 'getLeftPos',
        value: function getLeftPos(projectId, index, topPos, timeLineBeginYear, pxPerYear) {
            var containerState = this.props.containerState;

            var itemList = containerState.projectContents[projectId];

            var leftPos = undefined;

            if (index % 2 == 0) {
                leftPos = 40;
                if (index >= 2) {
                    if (topPos - itemInMainParam[index - 2].topPos == 0) {
                        leftPos = itemInMainParam[index - 2].leftPos - 15;
                    } else if (Math.abs(topPos - itemInMainParam[index - 2].topPos) < 80) {
                        if (itemInMainParam[index - 2].leftPos == 40) {
                            leftPos = 50;
                        }
                    }
                }
            } else {
                leftPos = containerState.canvasWidthforActiveId / 0.3 * 0.65;
                if (index >= 2) {
                    if (topPos - itemInMainParam[index - 2].topPos == 0) {
                        leftPos = itemInMainParam[index - 2].leftPos + 15;
                    } else if (Math.abs(topPos - itemInMainParam[index - 2].topPos) < 80) {
                        if (itemInMainParam[index - 2].leftPos == leftPos) {
                            leftPos = leftPos - 10;
                        }
                    }
                }
            }
            return leftPos;
        }
    }, {
        key: 'getTopPos',
        value: function getTopPos(projectId, index, timeLineBeginYear, pxPerYear) {
            var containerState = this.props.containerState;

            var marginTop = 30;
            var topPos = marginTop;

            var itemList = containerState.projectContents[projectId];

            if (itemList[index].itemType < 3) {
                //点事件
                topPos = (itemList[index].startYear - timeLineBeginYear) * pxPerYear - 40 + marginTop;
            } else {
                //段事件
                var rectTopY = (itemList[index].startYear - timeLineBeginYear) * pxPerYear + marginTop;
                var rectHeight = (itemList[index].endYear - itemList[index].startYear) * pxPerYear;
                topPos = rectTopY + rectHeight / 2 - 40;
            }

            return topPos;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props2 = this.props,
                containerState = _props2.containerState,
                actioncreator = _props2.actioncreator;

            if (containerState.projectsList.length == 0 && containerState.justLogin == true) {
                actioncreator.getAllProjects();
            }

            itemInMainParam = {};

            var lastYear = 0;
            var earlyYear = 0;
            var projectItemList = containerState.projectContents[containerState.activeId];
            if (projectItemList != undefined) {
                for (var i = 0; i < projectItemList.length; i++) {
                    if (earlyYear == 0) {
                        earlyYear = projectItemList[i].startYear;
                    } else {
                        if (projectItemList[i].startYear < earlyYear) {
                            earlyYear = projectItemList[i].startYear;
                        }
                    }

                    if (lastYear == 0) {
                        lastYear = projectItemList[i].endYear;
                    } else {
                        if (projectItemList[i].endYear > lastYear) {
                            lastYear = projectItemList[i].endYear;
                        }
                    }
                }
            }

            var yearLength = lastYear - earlyYear;
            var pxPerYear = getPxPerYear(yearLength);
            var yearInterval = getYearInterval(yearLength);
            var timeLineBeginYear = getTimeLineBeginYear(earlyYear, yearInterval);

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
                                { className: _MyHisList2.default.timebackground },
                                _react2.default.createElement(
                                    'div',
                                    { id: 'canvasdiv1', className: _MyHisList2.default.timeline },
                                    _react2.default.createElement(_MyCanvas2.default, { componentState: containerState.projectContents[containerState.activeId] })
                                ),
                                _react2.default.createElement('div', { className: _MyHisList2.default.itemsright })
                            ) : _react2.default.createElement(
                                'div',
                                { className: _MyHisList2.default.notimebackground },
                                containerState.projectContents[containerState.activeId].map(function (item, index) {
                                    var topPos = 0;
                                    topPos = _this3.getTopPos(containerState.activeId, index, timeLineBeginYear, pxPerYear);
                                    var leftPos = 0;
                                    leftPos = _this3.getLeftPos(containerState.activeId, index, topPos, timeLineBeginYear, pxPerYear);
                                    itemInMainParam[index] = { 'topPos': topPos, 'leftPos': leftPos };
                                    return _react2.default.createElement(_ItemInMain2.default, { key: item.itemId, componentState: item, leftPos: leftPos, topPos: topPos });
                                }),
                                _react2.default.createElement(
                                    'div',
                                    { ref: 'canvasdiv2', className: _MyHisList2.default.timeline },
                                    _react2.default.createElement(_MyCanvas2.default, { componentState: containerState.projectContents[containerState.activeId], canvasWidth: containerState.canvasWidthforActiveId,
                                        pxPerYear: pxPerYear, timeLineBeginYear: timeLineBeginYear, lastYear: lastYear, earlyYear: earlyYear, yearInterval: yearInterval })
                                )
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

function getPxPerYear(yearLength) {
    var ret = undefined;
    if (yearLength < 50) {
        ret = 30;
    } else if (yearLength < 100) {
        ret = 20;
    } else if (yearLength < 500) {
        ret = 10;
    } else if (yearLength < 1000) {
        ret = 5;
    } else if (yearLength < 5000) {
        ret = 1;
    } else {
        ret = 5000 / yearLength;
    }
    return ret;
}

function getYearInterval(yearLength) {
    var ret = undefined;
    if (yearLength < 50) {
        ret = 5;
    } else if (yearLength < 100) {
        ret = 10;
    } else if (yearLength < 500) {
        ret = 25;
    } else if (yearLength < 1000) {
        ret = 50;
    } else if (yearLength < 5000) {
        ret = 100;
    } else {
        ret = 200;
    }
    return ret;
}

function getTimeLineBeginYear(earlyYear, yearInterval) {
    var ret = 0;
    if (earlyYear < 0) {
        ret = (parseInt(earlyYear / yearInterval) - 1) * yearInterval;
    } else {
        if (earlyYear == parseInt(earlyYear / yearInterval) * yearInterval) {
            //earlyYear 在箭头起点,则将箭头起点提前
            ret = earlyYear - yearInterval;
        } else {
            ret = parseInt(earlyYear / yearInterval) * yearInterval;
        }
    }
    return ret;
}

exports.default = (0, _reactRedux.connect)(selectState, buildActionDispatcher)(MyHisList);

//# sourceMappingURL=MyHisList.js.map