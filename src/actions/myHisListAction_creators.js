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
                console.log(data);
                if(data.errorCode=='0'){
                    dispatch(actions.doneGetAllProjects(data));
                }else{
                    console.log('data error');
                }
            }
        );
    },

    getProjectContent: projectId => (dispatch, getState) => {

        let projectContent = getState().myHisListState.projectContents[projectId];
        // console.log(projectContent);
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
                console.log(data);
                if(data.errorCode=='0'){
                    dispatch(actions.doneCreateProj(data));
                    //不必以下步骤,因为container- MyHisList 中有逻辑,如果containerState.projectsList.length == 0,则取一次
                    dispatch(actions.getAllProjects());
                }else{
                    dispatch(actions.doneCreateProj(data));
                    console.log('data error');
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
                    dispatch(actions.doneDeleteProj(data));
                    dispatch(actions.getAllProjects());
                }else{
                    dispatch(actions.doneDeleteProj(data));
                    console.log('data error');
                }
            }
        );
    },

    beginCreateProj: () => ({
        type: 'lists/BEGIN_CREATEPROJ',
    }),

    doneCreateProj: (retMessage) => ({
        type: 'lists/DONE_CREATEPROJ',
        payload: retMessage
    }),

    doneDeleteProj: (retMessage) => ({
        type: 'lists/DONE_DELETEPROJ',
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

    addProjectButtonClick: () => ({
        type: 'lists/CLICK_ADDPROJECTBUTTON',
    }),

    popAlertAddProj: alertMsg => ({
        type: 'lists/POPALERT_ADDPROJ',
        payload: alertMsg
    }),



};

export default actions;

