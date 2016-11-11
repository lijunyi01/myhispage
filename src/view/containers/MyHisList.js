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

var _myHisListAction_creators = require('../../actions/myHisListAction_creators');

var _myHisListAction_creators2 = _interopRequireDefault(_myHisListAction_creators);

var _redux = require('redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import PureRenderMixin from 'react-addons-pure-render-mixin';
// import { render } from 'react-dom';

// import AppleItem from '../components/AppleItem';

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
            //模拟数据
            // let mockstate = {
            //     isPicking : false,
            //     newAppleId: 3,
            //     apples: [
            //         {
            //             id: 1,
            //             weight: 235,
            //             isEaten: true
            //         },
            //         {
            //             id: 2,
            //             weight: 256,
            //             isEaten: false
            //         },
            //         {
            //             id: 3,
            //             weight: 266,
            //             isEaten: false
            //         }
            //
            //     ]
            // };

            //是否开启模拟数据的开关，注释这行代码关闭模拟数据
            //containerState = mockstate;

            //对 state 做显示级别的转化;局部数据,根据state得来
            // let stats = {
            //     appleNow: {
            //         quantity: 0,
            //         weight: 0
            //     },
            //     appleEaten: {
            //         quantity: 0,
            //         weight: 0
            //     }
            // };

            // console.log('AppleBasket.jsx');
            // console.log(containerState);
            // console.log(state.apples);

            // if(containerState.apples.length!=0) {
            //     containerState.apples.map(apple => {
            //         let selector = apple.isEaten ? 'appleEaten' : 'appleNow';
            //         stats[selector].quantity++;
            //         stats[selector].weight += apple.weight;
            //     });
            // }else{
            //     // console.log('containerState is undefined');
            // }

            return _react2.default.createElement('div', { className: _MyHisList2.default.myHisList });
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