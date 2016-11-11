/**
 * Created by ljy on 16/9/7.
 * 于是就有了 immutable.js 这个专门处理不变性数据的库(也是facebook出品)，
 * 它可以使用类似赋值的方式生成浅复制的不变性数据
 *
 * 以下setIn 就是库isPicking暴露出的函数,看似直接操作state,实际实现了浅复制,返回了一个新的js对象
 */

import { fromJS,Map } from 'immutable';

const initState = {
    isPicking : false,
    newAppleId: 1,
    apples: []
};

export default (state = initState, action) => {

    let newState ;
    // console.log(state);

    if (action.type === 'apple/SET_STATE') {
        newState = Object.assign({}, state, action.payload);
        return newState;
    } else if (action.type === 'apple/BEGIN_PICK_APPLE') {
        // console.log('begin to pick!');
        return fromJS(state).setIn(['isPicking'], true).toJS();
    } else if (action.type === 'apple/DONE_PICK_APPLE') {
        // newState = Object.assign({}, state, {
        //     newAppleId: state.newAppleId + 1,
        //     apples: [
        //         ...state.apples,
        //         {
        //             id: state.newAppleId,
        //             weight: action.payload,
        //             isEaten: false
        //         }
        //     ]
        // });
        let newId = fromJS(state).get('newAppleId') +1;
        let newApples = fromJS(state).get('apples').push(Map({id:newId-1,weight:action.payload,isEaten:false}));
        newState = fromJS(state).set('newAppleId',newId).set('apples',newApples).toJS();
        return newState;
    } else if (action.type === 'apple/FAIL_PICK_APPLE') {
        return state;
    } else if (action.type === 'apple/EAT_APPLE') {
        // console.log(state);
        newState = fromJS(state).setIn(['apples', action.payload-1, 'isEaten'], true).toJS();
        // console.log(newState);
        return newState;
    } else {
        return state;
    }

};