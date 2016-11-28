/**
 * Created by ljy on 16/9/7.
 * 于是就有了 immutable.js 这个专门处理不变性数据的库(也是facebook出品)，
 * 它可以使用类似赋值的方式生成浅复制的不变性数据
 *
 * 以下setIn 就是库isPicking暴露出的函数,看似直接操作state,实际实现了浅复制,返回了一个新的js对象
 */

import { fromJS } from 'immutable';

const initState = {
    isSubmitting : false,
    resultModal: {show: false , content:''},
    selfCheckModal: {show: false , content:''},
};

export default (state = initState, action) => {

    let newState ;
    // console.log(state);

    if (action.type === 'myhis/SET_STATE') {
        newState = Object.assign({}, state, action.payload);
        return newState;
    } else if (action.type === 'myhis/BEGIN_SUBMIT') {
        console.log(state);
        return fromJS(state).setIn(['isSubmitting'], true).toJS();
    } else if(action.type === 'myhis/DONE_SUBMIT') {
        console.log(action.payload);
        return fromJS(state).setIn(['isSubmitting'], false).setIn(['resultModal','show'],true).setIn(['resultModal','content'],action.payload.errorMessage).toJS();
    } else if(action.type === 'myhis/SHUT_RESULTMODAL') {
        return fromJS(state).setIn(['resultModal','show'], false).toJS();
    } else if(action.type == 'myhis/SHUT_SELFCHECKMODAL') {
        return fromJS(state).setIn(['selfCheckModal','show'], false).toJS();
    } else if(action.type == 'myhis/POP_ALERT'){
        return fromJS(state).setIn(['selfCheckModal','show'],true).setIn(['selfCheckModal','content'],action.payload).toJS();
    } else {
        return state;
    }

};