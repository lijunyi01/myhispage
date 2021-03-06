/**
 * Created by ljy on 16/9/7.
 * 于是就有了 immutable.js 这个专门处理不变性数据的库(也是facebook出品)，
 * 它可以使用类似赋值的方式生成浅复制的不变性数据
 *
 * 以下setIn 就是库isPicking暴露出的函数,看似直接操作state,实际实现了浅复制,返回了一个新的js对象
 */

import { fromJS } from 'immutable';

const initState = {
};

export default (state = initState, action) => {

    let newState ;
    // console.log(state);

    if (action.type === 'userset/SET_STATE') {
        newState = Object.assign({}, state, action.payload);
        return newState;
    } else {
        return state;
    }

};