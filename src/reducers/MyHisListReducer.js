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
    justLogin: true,
    projectContents: {},
    addProjectModal: {
        show: false,
        isSubmitting: false,
    },
    addItemModal: {
        show: false,
        isSubmitting: false,
        projectId: -1,
        projectName: '',
        isDotTime: true,
        isGongYuan: true,
    },
    confirmModal: {
        show: false,
        title: '',
        content: '',
        delId: -1,
    },
    resultModal:{
        show: false,
        content: ''
    },
};

export default (state = initState, action) => {

    let newState ;
    // console.log(state);

    if (action.type === 'lists/SET_STATE') {
        newState = Object.assign({}, state, action.payload);
        return newState;

    } else if(action.type === 'lists/SET_JUSTLOGIN') {
        return fromJS(state).set('justLogin', true).toJS();

    } else if(action.type === 'lists/RESET_JUSTLOGIN') {
        return fromJS(state).set('justLogin',false).toJS();

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
        return fromJS(state).setIn(['resultModal', 'show'], false).toJS();

    } else if(action.type === 'lists/SHUT_SELFCHECKMODAL') {
        return fromJS(state).setIn(['addProjectModal', 'selfCheckModal', 'show'], false).toJS();

    } else if(action.type === 'lists/SHUT_CONFIRMMODAL') {
        return fromJS(state)
            .setIn(['confirmModal', 'show'], false)
            .setIn(['confirmModal', 'delId'], -1)
            .setIn(['confirmModal', 'title'], '')
            .setIn(['confirmModal', 'content'], '')
            .toJS();

    } else if(action.type === 'lists/SHUT_ADDITEMMODAL') {
        return fromJS(state)
            .setIn(['addItemModal', 'show'], false)
            .setIn(['addItemModal', 'projectId'], -1)
            .setIn(['addItemModal', 'isDotTime'],true)
            .setIn(['addItemModal', 'isGongYuan'],true)
            .toJS();

    } else if(action.type === 'lists/CLICK_ADDPROJECTBUTTON') {
        return fromJS(state).setIn(['addProjectModal', 'show'], true).toJS();

    } else if(action.type === 'lists/CLICK_ADDITEMBUTTON') {
        return fromJS(state)
            .setIn(['addItemModal', 'show'], true)
            .setIn(['addItemModal', 'projectName'],action.payload.pname)
            .setIn(['addItemModal', 'projectId'],action.payload.pid)
            .toJS();

    } else if(action.type === 'lists/BEGIN_CREATEPROJ') {
        return fromJS(state).setIn(['addProjectModal', 'isSubmitting'], true).toJS();

    } else if(action.type === 'lists/POPALERT') {
        return fromJS(state)
            .setIn(['resultModal', 'show'], true)
            .setIn(['resultModal', 'content'], action.payload)
            .toJS();

    } else if(action.type === 'lists/DONE_CREATEPROJ') {
        return fromJS(state)
            // .set('projectsList', List())
            .setIn(['addProjectModal', 'isSubmitting'], false)
            .setIn(['addProjectModal', 'show'], false)
            .toJS();

    } else if(action.type === 'lists/DONE_CREATEPROJ_ERROR') {
        return fromJS(state)
            .setIn(['addProjectModal', 'isSubmitting'], false)
            .setIn(['resultModal', 'show'], true)
            .setIn(['resultModal', 'content'], action.payload.errorMessage)
            .toJS();

    } else if(action.type === 'lists/DONE_DELETEPROJ') {
        return fromJS(state)
            // .set('projectsList', List())
            .setIn(['confirmModal', 'show'], false)
            .setIn(['confirmModal', 'delId'], -1)
            .setIn(['confirmModal', 'title'], '')
            .setIn(['confirmModal', 'content'], '')
            .toJS();

    } else if(action.type === 'lists/DONE_DELETEPROJ_ERROR') {
        return fromJS(state)
            .setIn(['confirmModal', 'show'], false)
            .setIn(['confirmModal', 'delId'], -1)
            .setIn(['confirmModal', 'title'], '')
            .setIn(['confirmModal', 'content'], '')
            .setIn(['resultModal', 'show'], true)
            .setIn(['resultModal', 'content'], action.payload.errorMessage)
            .toJS();

    } else if(action.type === 'lists/SHOW_CONFIRM') {
        console.log(action.payload);
        return fromJS(state)
            .setIn(['confirmModal', 'show'], true)
            .setIn(['confirmModal', 'title'], action.payload.title)
            .setIn(['confirmModal', 'content'], action.payload.content)
            .setIn(['confirmModal', 'delId'], action.payload.id)
            .toJS();

    } else if(action.type === 'lists/CHANGE_TMRADIO') {
        let isDot;
        // console.log(action.payload);
        if(action.payload === 'A'){
            isDot = true;
        }else{
            isDot = false;
        }
        return fromJS(state).setIn(['addItemModal','isDotTime'],isDot).toJS()

    } else if(action.type === 'lists/CHANGE_YEARRADIO') {
        let isGongYuan;
        console.log(action.payload);
        if(action.payload === 'A'){
            isGongYuan = true;
        }else{
            isGongYuan = false;
        }
        return fromJS(state).setIn(['addItemModal','isGongYuan'],isGongYuan).toJS()

    } else {
        return state;
    }

};