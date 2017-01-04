/**
 * Created by ljy on 16/9/13.
 * 本文件定义了 action creators (相当于工厂)
 */

import mySocket from '../services/mySocket';

// import ajax from '../services/ajax'; //经过封装的加强型 ajax 函数

//这是名空间，对普通action做划分
const prefix = 'lists/';

let actions = {

    //注意这里需要 () => ... , 不然 不是一个actionCreator, 而是一个thunk
    getAllProjects: () => (dispatch, getState) => {

        mySocket.emit(
            'getAllProjects',
            {},
            (data)=>{
                // console.log(data);
                if(data.errorCode=='0') {
                    dispatch(actions.doneGetAllProjects(data));
                    dispatch(actions.getProjectContent(getState().myHisListState.activeId));
                    if (getState().myHisListState.justLogin == true) {
                        dispatch(actions.resetJustLogin());
                    }
                }else{
                    console.log('data error');
                }
            }
        );
    },

    getProjectContent: projectId => (dispatch, getState) => {

        let projectContent = getState().myHisListState.projectContents[projectId];
        // console.log("click");
        if(projectContent == undefined) {
            // console.log('fetch remote data!');
            mySocket.emit(
                'getProjectItems',
                {'projectId':projectId},
                (data)=> {
                    console.log(data);
                    if (data.errorCode == '0') {
                        dispatch(actions.clickItem(projectId));
                        let content = JSON.parse(data.generalAckContent);
                        dispatch(actions.pushProjectContent(projectId,content));
                    } else {
                        console.log('data error');
                    }
                }
            );
        }else{
            dispatch(actions.clickItem(projectId));
        }
    },

    createProj: inParam => (dispatch, getState) => {

        // console.log(getState());

        //如果正在提交，则结束这个thunk, 不执行
        if(getState().myHisListState.addProjectModal.isSubmitting)
            return;

        // console.log("create project");

        //通知开始提交
        dispatch(actions.beginCreateProj());

        //发送create project请求
        // mySocket.init('222.46.16.173','8001','1','6969da5b-1af1-4ade-8f99-7a174c9d1018');
        mySocket.emit(
            'createProject',
            // {projectName:inParam.projectName,projectDes:inParam.projectDes},
            inParam,
            // {projectName:'n1',projectDes:'d1'},
            (data)=>{
                // console.log(data);
                if(data.errorCode=='0'){
                    dispatch(actions.doneCreateProj());
                }else{
                    dispatch(actions.doneCreateProjError(data));
                    // console.log('data error');
                }
            }
        );

    },

    deleteProj: projectId => (dispatch, getState) => {
        // console.log('deleteproj');
        mySocket.emit(
            'delProject',
            {projectId:projectId},
            (data)=>{
                console.log(data);
                if(data.errorCode=='0'){
                    dispatch(actions.doneDeleteProj());
                    dispatch(actions.getAllProjects());
                }else{
                    dispatch(actions.doneDeleteProjError(data));
                    // console.log('data error');
                }
            }
        );
    },

    addItemButtonClick: projectId => (dispatch, getState) => {
        if(projectId == -1){
            dispatch(actions.popAlert('尚未选中笔记,请在左侧列表选择'));
        }else{

            let name = '';
            let length = getState().myHisListState.projectsList.length;
            for(let i=0; i< length; i++){
               if(getState().myHisListState.projectsList[i].id == projectId){
                   name = getState().myHisListState.projectsList[i].projectname;
                   break;
               }
            }
            if(! name == ''){
                dispatch(actions.addItemButtonClickA({pid:projectId,pname:name}));
            }else{
                dispatch(actions.popAlert('未查到项目名称,请先在左侧列表选择项目'));
            }
        }
    },

    createProjItem: inParam => (dispatch, getState) => {
        //如果正在提交，则结束这个thunk, 不执行
        if(getState().myHisListState.addItemModal.isSubmitting)
            return;

        //通知开始提交
        dispatch(actions.beginAddItem());

        //发送create item请求
        mySocket.emit(
            'createItem',
            inParam,
            (data)=>{
                console.log(data);
                if(data.errorCode=='0'){
                    dispatch(actions.clearProjectContent(inParam.projectId));
                    dispatch(actions.getProjectContent(inParam.projectId));
                    dispatch(actions.doneCreateItem());
                    // console.log("pid:"+inParam.projectId);
                }else{
                    dispatch(actions.doneCreateItemError(data));
                    // console.log('data error');
                }
            }
        );
    },

    setCanvasWidth: width =>(dispatch,getState) =>{
       dispatch(actions.setCanvasWidth2(width));
    },

    beginCreateProj: () => ({
        type: 'lists/BEGIN_CREATEPROJ'
    }),

    doneCreateProj: () => ({
        type: 'lists/DONE_CREATEPROJ',
    }),

    doneCreateProjError: (retMessage) => ({
        type: 'lists/DONE_CREATEPROJ_ERROR',
        payload: retMessage
    }),

    doneCreateItem: () => ({
        type: 'lists/DONE_CREATEITEM',
    }),

    doneDeleteProj: () => ({
        type: 'lists/DONE_DELETEPROJ'
    }),

    doneDeleteProjError: (retMessage) => ({
        type: 'lists/DONE_DELETEPROJ_ERROR',
        payload: retMessage
    }),

    doneGetAllProjects: data => ({
        type: 'lists/DONE_GETALLPROJECTS',
        payload: data
    }),

    clickItem: id => ({
        type: 'lists/CLICK_ITEM',
        payload:id
    }),

    pushProjectContent: (id,content) => ({
        type: 'lists/PUSH_PCONTENT',
        payload:{'id':id,'content':content}
    }),

    shutAddProjectModal: () => ({
        type: 'lists/SHUT_ADDPROJECTMODAL',
    }),

    shutResultModal: () => ({
        type: 'lists/SHUT_RESULTMODAL',
    }),

    shutSelfCheckModal: () => ({
        type: 'lists/SHUT_SELFCHECKMODAL',
    }),

    shutConfirmModal: () => ({
        type: 'lists/SHUT_CONFIRMMODAL',
    }),

    shutAddItemModal: () => ({
        type: 'lists/SHUT_ADDITEMMODAL',
    }),

    addProjectButtonClick: () => ({
        type: 'lists/CLICK_ADDPROJECTBUTTON',
    }),

    addItemButtonClickA: inParam => ({
        type: 'lists/CLICK_ADDITEMBUTTON',
        payload: inParam
    }),

    popAlert: alertMsg => ({
        type: 'lists/POPALERT',
        payload: alertMsg
    }),

    resetJustLogin: () => ({
        type: 'lists/RESET_JUSTLOGIN',
    }),

    showConfirm: inParam => ({
        type: 'lists/SHOW_CONFIRM',
        payload: inParam
    }),

    changeTmRadio: param =>({
        type: 'lists/CHANGE_TMRADIO',
        payload: param
    }),

    changeYearRadio: param =>({
        type: 'lists/CHANGE_YEARRADIO',
        payload: param
    }),

    beginAddItem: ()=> ({
        type: 'lists/BEGIN_ADDITEM',
    }),

    clearProjectContent: projectId => ({
        type: 'lists/CLEAR_PROJECTCONTENT',
        payload: projectId
    }),

    setCanvasWidth2: width => ({
        type: 'lists/SET_CANVASWIDTH',
        payload: width
    })

};

export default actions;

