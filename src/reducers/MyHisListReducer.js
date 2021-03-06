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
    activeProjectName: '',
    activeItemIndex: -1,
    canvasWidthforActiveId: 0,
    justLogin: true,
    fullsizeShow: false,
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
    changeItemModal: {
        show: false,
        isSubmitting: false,
        projectId: -1,
        projectName: '',
        itemId: -1,
        isDotTime: true,
        isGongYuan: true,
    },
    confirmModal: {
        show: false,
        title: '',
        content: '',
        delType: '',
        delId: -1,
    },
    resultModal:{
        show: false,
        content: ''
    },
    changeTipsModal:{
        show: false,
        isSubmitting: false,
        itemId: -1,
        itemName: '',
        // tipList: []
    }
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
        let firstName = '';
        // let noProjectData = false;
        if(projectsList.length > 0) {
            firstId = projectsList[0].id;
            firstName = projectsList[0].projectname;
        }
        return fromJS(state)
            .set('projectsList', projectsList)
            .set('activeId',firstId)
            .set('activeProjectName',firstName)
            .toJS();

    } else if(action.type === 'lists/CLICK_ITEM') {
        return fromJS(state)
            .set('activeId', action.payload.projectId)
            .set('activeProjectName',action.payload.projectName)
            .toJS();

    } else if(action.type === 'lists/PUSH_PCONTENT') {
        let idInPayload = action.payload.id;
        let contentInPayload = action.payload.content;
        let newProjectContents = fromJS(state).get('projectContents').set(idInPayload, contentInPayload).toJS();
        return fromJS(state).set('projectContents', newProjectContents).toJS();

    } else if(action.type == 'lists/PUSH_ITEMTIPMAPLIST'){
        let sProjectId = action.payload.projectId + '';
        let sActiveItemIndex = state.activeItemIndex +'';
        // console.log(action.payload.content);
        return fromJS(state).setIn(['projectContents',sProjectId,sActiveItemIndex,'itemTipMapList'],action.payload.content).toJS()

    } else if(action.type === 'lists/SHUT_ADDPROJECTMODAL') {
        return fromJS(state)
            .setIn(['addProjectModal', 'show'], false)
            .setIn(['addProjectModal', 'isSubmitting'], false)
            .toJS();

    } else if(action.type === 'lists/SHUT_RESULTMODAL') {
        return fromJS(state).setIn(['resultModal', 'show'], false).toJS();

    } else if(action.type === 'lists/SHUT_SELFCHECKMODAL') {
        return fromJS(state).setIn(['addProjectModal', 'selfCheckModal', 'show'], false).toJS();

    } else if(action.type === 'lists/SHUT_CONFIRMMODAL') {
        return fromJS(state)
            .setIn(['confirmModal', 'show'], false)
            .setIn(['confirmModal', 'delId'], -1)
            .setIn(['confirmModal', 'delType'], '')
            .setIn(['confirmModal', 'title'], '')
            .setIn(['confirmModal', 'content'], '')
            .toJS();

    } else if(action.type === 'lists/SHUT_ADDITEMMODAL') {
        return fromJS(state)
            .setIn(['addItemModal', 'show'], false)
            .setIn(['addItemModal', 'isSubmitting'], false)
            .setIn(['addItemModal', 'projectId'], -1)
            .toJS();

    } else if(action.type === 'lists/CLICK_ADDPROJECTBUTTON') {
        return fromJS(state).setIn(['addProjectModal', 'show'], true).toJS();

    } else if(action.type === 'lists/CLICK_ADDITEMBUTTON') {
        let projectName = state.activeProjectName;
        let projectId = state.activeId;
        return fromJS(state)
            .setIn(['addItemModal', 'show'], true)
            .setIn(['addItemModal', 'projectName'],projectName)
            .setIn(['addItemModal', 'projectId'],projectId)
            .toJS();

    } else if(action.type === 'lists/BEGIN_CREATEPROJ') {
        return fromJS(state).setIn(['addProjectModal', 'isSubmitting'], true).toJS();

    } else if(action.type === 'lists/BEGIN_ADDITEM') {
        return fromJS(state).setIn(['addItemModal', 'isSubmitting'], true).toJS();

    } else if(action.type === 'lists/BEGIN_CHANGEITEM') {
        return fromJS(state).setIn(['changeItemModal', 'isSubmitting'], true).toJS();

    } else if(action.type === 'lists/POPALERT') {
        return fromJS(state)
            .setIn(['resultModal', 'show'], true)
            .setIn(['resultModal', 'content'], action.payload)
            .toJS();

    } else if(action.type === 'lists/RESET_PROJLIST') {
        return fromJS(state)
            .set('projectsList', List())
            .toJS();

    } else if(action.type === 'lists/SHOW_CONFIRM') {
        console.log(action.payload);
        return fromJS(state)
            .setIn(['confirmModal', 'show'], true)
            .setIn(['confirmModal', 'title'], action.payload.title)
            .setIn(['confirmModal', 'content'], action.payload.content)
            .setIn(['confirmModal', 'delType'], action.payload.delType)
            .setIn(['confirmModal', 'delId'], action.payload.delId)
            .toJS();

    } else if(action.type === 'lists/SHOW_RESULT') {
        console.log(action.payload);
        return fromJS(state)
            .setIn(['resultModal', 'show'], true)
            .setIn(['resultModal', 'content'], action.payload.errorMessage)
            .toJS();

    } else if(action.type === 'lists/CHANGE_TMRADIO') {
        let isDot;
        // console.log(action.payload);
        if(action.payload === 'A'){
            isDot = true;
        }else{
            isDot = false;
        }
        return fromJS(state).setIn(['addItemModal','isDotTime'],isDot).toJS();

    } else if(action.type === 'lists/CHANGE_TMRADIO2') {
        let isDot;
        // console.log(action.payload);
        if(action.payload === 'A'){
            isDot = true;
        }else{
            isDot = false;
        }
        return fromJS(state).setIn(['changeItemModal','isDotTime'],isDot).toJS();

    } else if(action.type === 'lists/CHANGE_YEARRADIO2') {
        let isGongYuan;
        console.log(action.payload);
        if (action.payload === 'A') {
            isGongYuan = true;
        } else {
            isGongYuan = false;
        }
        return fromJS(state).setIn(['changeItemModal', 'isGongYuan'], isGongYuan).toJS();

    } else if(action.type === 'lists/CLEAR_PROJECTCONTENT') {
        let sindex = action.payload + '';
        return fromJS(state)
            .deleteIn(['projectContents', sindex])
            .toJS();

    } else if(action.type === 'lists/SET_CANVASWIDTH') {
        return fromJS(state).set('canvasWidthforActiveId', action.payload).toJS();

    } else if(action.type == 'lists/CLICK_MODIFYTIPSBUTTON') {
        return fromJS(state)
            .setIn(['changeTipsModal','show'], true)
            .setIn(['changeTipsModal','itemName'],action.payload.itemName)
            .setIn(['changeTipsModal','itemId'],action.payload.itemId)
            .set('activeItemIndex',action.payload.itemIndex)
            .toJS();

    } else if(action.type == 'lists/CLICK_MODIFYITEMBUTTON') {
        let projectName = state.activeProjectName;
        let projectId = state.activeId;
        let itemType = state.projectContents[state.activeId][action.payload.itemIndex].itemType;
        let isDotTime = true;
        let isGongYuan = true;
        if (itemType > 2) {
            isDotTime = false;
        }
        if (itemType == 2 || itemType == 4) {
            isGongYuan = false;
        }
        // console.log("projectId:"+projectId);
        return fromJS(state)
            .setIn(['changeItemModal', 'show'], true)
            .setIn(['changeItemModal', 'projectId'], projectId)
            .setIn(['changeItemModal', 'projectName'], projectName)
            .setIn(['changeItemModal', 'itemId'], action.payload.itemId)
            .setIn(['changeItemModal', 'isDotTime'], isDotTime)
            .setIn(['changeItemModal', 'isGongYuan'], isGongYuan)
            .set('activeItemIndex', action.payload.itemIndex)
            .toJS();

    } else if(action.type == 'lists/SHUT_CHANGETIPSMODAL') {
        return fromJS(state)
            .setIn(['changeTipsModal', 'show'], false)
            .setIn(['changeTipsModal', 'isSubmitting'], false)
            .setIn(['changeTipsModal', 'itemName'], '')
            .set('activeItemIndex', -1)
            .toJS();

    } else if(action.type == 'lists/SHUT_CHANGEITEMMODAL') {
        return fromJS(state)
            .setIn(['changeItemModal', 'show'], false)
            .setIn(['changeItemModal', 'isSubmitting'], false)
            .set('activeItemIndex', -1)
            .toJS();

    } else if(action.type == 'lists/CLICK_ZOOMBUTTON') {
        return fromJS(state).set('fullsizeShow', !state.fullsizeShow).toJS();

    } else if(action.type == 'lists/DONE_MODIFYITEM') {
        let sProjectId = action.payload.projectId +'';
        let sActiveItemIndex = state.activeItemIndex +'';
        return fromJS(state)
            .setIn(['projectContents',sProjectId,sActiveItemIndex,'itemName'],action.payload.itemName)
            .setIn(['projectContents',sProjectId,sActiveItemIndex,'itemContent'],action.payload.itemDes)
            .setIn(['projectContents',sProjectId,sActiveItemIndex,'itemType'],action.payload.type)
            .setIn(['projectContents',sProjectId,sActiveItemIndex,'startYear'],action.payload.startYear)
            .setIn(['projectContents',sProjectId,sActiveItemIndex,'startYearDes'],action.payload.startYearDes)
            .setIn(['projectContents',sProjectId,sActiveItemIndex,'startYearNDFlag'],action.payload.startYearNDFlag)
            .setIn(['projectContents',sProjectId,sActiveItemIndex,'startTime'],action.payload.startTime)
            .setIn(['projectContents',sProjectId,sActiveItemIndex,'endYear'],action.payload.endYear)
            .setIn(['projectContents',sProjectId,sActiveItemIndex,'endYearDes'],action.payload.endYearDes)
            .setIn(['projectContents',sProjectId,sActiveItemIndex,'endYearNDFlag'],action.payload.endYearNDFlag)
            .setIn(['projectContents',sProjectId,sActiveItemIndex,'endTime'],action.payload.endTime)
            .set('activeItemIndex',-1)
            .toJS();

    } else {
        return state;
    }

};