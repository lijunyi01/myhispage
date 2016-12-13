/**
 * Created by ljy on 16/9/7.
 * 于是就有了 immutable.js 这个专门处理不变性数据的库(也是facebook出品)，
 * 它可以使用类似赋值的方式生成浅复制的不变性数据
 *
 * 以下setIn 就是库isPicking暴露出的函数,看似直接操作state,实际实现了浅复制,返回了一个新的js对象
 */

import { fromJS,Map,List } from 'immutable';

const initState = {
    projectsList: [],
    activeId: -1,
    justLogin: false,
    projectContents: {},
    addProjectModal: {
        show: false,
        isSubmitting: false,
        resultModal:{
            show: false,
            content: ''
        },
        selfCheckModal:{
            show: false,
            content: ''
        }
    },
};

export default (state = initState, action) => {

    let newState ;
    // console.log(state);

    if (action.type === 'lists/SET_STATE') {
        newState = Object.assign({}, state, action.payload);
        return newState;

    } else if(action.type === 'lists/SET_JUSTLOGIN') {
        return fromJS(state).set('justLogin',true).toJS();

    } else if(action.type === 'lists/DONE_GETALLPROJECTS') {
        let projectsList = JSON.parse(action.payload.generalAckContent);
        let firstId = -1;
        // let noProjectData = false;
        if(projectsList.length > 0) {
            firstId = projectsList[0].id;
        }
        return fromJS(state)
            .set('projectsList', projectsList)
            .set('activeId',firstId)
            .set('justLogin',false)
            .toJS();

    } else if(action.type === 'lists/CLICK_ITEM') {
        return fromJS(state).set('activeId', action.payload).toJS();

    } else if(action.type === 'lists/PUSH_PCONTENT') {
        let idInPayload = action.payload.id;
        let contentInPayload = action.payload.content;
        let newProjectContents = fromJS(state).get('projectContents').set(idInPayload, contentInPayload).toJS();
        // console.log(newProjectContents);
        return fromJS(state).set('projectContents', newProjectContents).toJS();
        // return fromJS(state).get('projectContents').set(idInPayload,contentInPayload).toJS();

    } else if(action.type === 'lists/SHUT_ADDPROJECTMODAL') {
        return fromJS(state).setIn(['addProjectModal', 'show'], false).toJS();

    } else if(action.type === 'lists/SHUT_RESULTMODAL') {
        return fromJS(state).setIn(['addProjectModal', 'resultModal', 'show'], false).toJS();

    } else if(action.type === 'lists/SHUT_SELFCHECKMODAL') {
        return fromJS(state).setIn(['addProjectModal', 'selfCheckModal', 'show'], false).toJS();

    } else if(action.type === 'lists/CLICK_ADDPROJECTBUTTON') {
        return fromJS(state).setIn(['addProjectModal', 'show'], true).toJS();

    } else if(action.type === 'lists/BEGIN_CREATEPROJ') {
        return fromJS(state).setIn(['addProjectModal', 'isSubmitting'], true).toJS();

    } else if(action.type === 'lists/POPALERT_ADDPROJ') {
        return fromJS(state)
            .setIn(['addProjectModal', 'selfCheckModal', 'show'], true)
            .setIn(['addProjectModal', 'selfCheckModal', 'content'], action.payload)
            .toJS();

    } else if(action.type === 'lists/DONE_CREATEPROJ') {
        return fromJS(state)
            .set('projectsList', List())
            .setIn(['addProjectModal', 'isSubmitting'], false)
            .setIn(['addProjectModal', 'resultModal', 'show'], true)
            .setIn(['addProjectModal', 'resultModal', 'content'], action.payload.errorMessage)
            .toJS();

    } else if(action.type === 'lists/DONE_DELETEPROJ') {
        return fromJS(state).set('projectsList', List()).toJS();

    } else {
        return state;
    }

};