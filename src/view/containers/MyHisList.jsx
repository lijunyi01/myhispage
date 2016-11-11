import React from 'react';
import { connect } from 'react-redux';
// import PureRenderMixin from 'react-addons-pure-render-mixin';
// import { render } from 'react-dom';
import styles from '../styles/MyHisList.css';
// import AppleItem from '../components/AppleItem';
import actions from '../../actions/myHisListAction_creators';
import { bindActionCreators } from 'redux';


class MyHisList extends React.Component {

    shouldComponentUpdate(nextProps){
        return nextProps.containerState != this.props.containerState;
    }

    render(){

        let { containerState, actioncreator } = this.props;
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


        return (
            <div className={styles.myHisList}>

            </div>
        );
    }

}

function selectState(state) {
    return {
        containerState: state.myHisListState
    };
}

function buildActionDispatcher(dispatch) {
    return {
        actioncreator: bindActionCreators(actions, dispatch)
    };
}


export default connect(selectState,buildActionDispatcher)(MyHisList);