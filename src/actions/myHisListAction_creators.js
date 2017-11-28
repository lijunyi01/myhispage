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
                    dispatch(actions.getProjectContent(getState().myHisListState.activeId,getState().myHisListState.activeProjectName));
                    if (getState().myHisListState.justLogin == true) {
                        dispatch(actions.resetJustLogin());
                    }
                }else{
                    dispatch(actions.showResult(data));
                }
            }
        );
    },

    getProjectContent: (projectId,projectName) => (dispatch, getState) => {

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
                        dispatch(actions.clickItem({'projectId':projectId,'projectName':projectName}));
                        let content = JSON.parse(data.generalAckContent);
                        dispatch(actions.pushProjectContent(projectId,content));
                    } else {
                        dispatch(actions.showResult(data));
                    }
                }
            );
        }else{
            dispatch(actions.clickItem({'projectId':projectId,'projectName':projectName}));
        }
    },

    // getItemTips: (projectId,itemId) => (dispatch, getState) => {
    //
    //     mySocket.emit(
    //         'getItemTips',
    //         {'projectId':projectId,'itemId':itemId},
    //         (data)=> {
    //             console.log(data);
    //             if (data.errorCode == '0') {
    //                 let content = JSON.parse(data.generalAckContent);
    //                 dispatch(actions.pushItemTipMapList(projectId,itemId,content));
    //             } else {
    //                 console.log('data error in getItemTips');
    //             }
    //         }
    //     );
    // },

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
                    dispatch(actions.resetProjList());
                    dispatch(actions.getAllProjects());
                    dispatch(actions.shutAddProjectModal())
                }else{
                    dispatch(actions.shutAddProjectModal());
                    dispatch(actions.showResult(data));
                }
            }
        );

    },

    //删除project，删除project item 等
    deleteSomething: (delType,delId) => (dispatch, getState) => {
        if (delType == 'DELPROJ') {
            mySocket.emit(
                'delProject',
                {projectId: delId},
                (data)=> {
                    console.log(data);
                    if (data.errorCode == '0') {
                        dispatch(actions.shutConfirmModal());
                        dispatch(actions.getAllProjects());
                    } else {
                        dispatch(actions.shutConfirmModal());
                        dispatch(actions.showResult(data));
                        // console.log('data error');
                    }
                }
            );
        } else if(delType == 'DELITEM'){
            let projectId = getState().myHisListState.activeId;
            mySocket.emit(
                'delItem',
                {itemId: delId,projectId: projectId},
                (data)=> {
                    console.log(data);
                    if (data.errorCode == '0') {
                        dispatch(actions.clearProjectContent(projectId));
                        dispatch(actions.getProjectContent(projectId));
                        dispatch(actions.shutConfirmModal());
                    } else {
                        dispatch(actions.shutConfirmModal());
                        dispatch(actions.showResult(data));
                    }
                }
            );
        }
    },

    // addItemButtonClick: projectId => (dispatch, getState) => {
    //     if(projectId == -1){
    //         dispatch(actions.popAlert('尚未选中笔记,请在左侧列表选择'));
    //     }else{
    //
    //         let name = getState().myHisListState.activeProjectName;
    //         if(! name == ''){
    //             dispatch(actions.addItemButtonClickA({pid:projectId,pname:name}));
    //         }else{
    //             dispatch(actions.popAlert('未查到项目名称,请先在左侧列表选择项目'));
    //         }
    //     }
    // },

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
                    dispatch(actions.shutAddItemModal());
                    // console.log("pid:"+inParam.projectId);
                }else{
                    dispatch(actions.doneCreateItemError(data));
                    dispatch(actions.showResult(data));

                }
            }
        );
    },

    modifyProjItem: inParam => (dispatch, getState) => {
        //如果正在提交，则结束这个thunk, 不执行
        if(getState().myHisListState.changeItemModal.isSubmitting)
            return;

        //通知开始提交
        dispatch(actions.beginChangeItem());

        //发送create item请求
        mySocket.emit(
            'modifyItem',
            inParam,
            (data)=>{
                // console.log(data);
                if(data.errorCode=='0'){
                    dispatch(actions.doneModifyItem(inParam));
                    dispatch(actions.shutChangeItemModal())
                }else{
                    dispatch(actions.showResult(data));
                    // console.log('data error');
                }
            }
        );
    },

    addTip: (itemId,tipContent) => (dispatch,getState) => {
        if(getState().myHisListState.changeTipsModal.isSubmitting)
            return;

        //通知开始提交
        dispatch(actions.beginAddTip());

        //发送add tip请求
        mySocket.emit(
            'addItemTip',
            {'projectId':getState().myHisListState.activeId,'itemId':itemId,'tipContent':tipContent},
            (data)=>{
                // console.log(data);
                if(data.errorCode=='0'){
                    let projectId = getState().myHisListState.activeId;
                    // dispatch(actions.getItemTips(projectId,itemId));
                    mySocket.emit(
                        'getItemTips',
                        {'projectId':projectId,'itemId':itemId},
                        (data)=> {
                            // console.log(data);
                            if (data.errorCode == '0') {
                                let content = JSON.parse(data.generalAckContent);
                                dispatch(actions.pushItemTipMapList(projectId,itemId,content));
                                dispatch(actions.shutChangeTipsModal());
                            } else {
                                dispatch(actions.showResult(data));
                                // console.log('data error in getItemTips');
                            }
                        }
                    );
                }else{
                    dispatch(actions.doneAddTipError(data));
                    // console.log('data error');
                }
            }
        );
    },

    deleteTip: (tipId,itemId) => (dispatch,getState) => {

        let projectId = getState().myHisListState.activeId;
        //发送delete tip请求
        mySocket.emit(
            'delItemTip',
            {'projectId':projectId,'tipId':tipId},
            (data)=> {
                if (data.errorCode == '0') {
                    mySocket.emit(
                        'getItemTips',
                        {'projectId':projectId,'itemId':itemId},
                        (data)=> {
                            // console.log(data);
                            if (data.errorCode == '0') {
                                let content = JSON.parse(data.generalAckContent);
                                dispatch(actions.pushItemTipMapList(projectId,itemId,content));
                                // dispatch(actions.doneAddTip());
                            } else {
                                dispatch(actions.showResult(data));
                            }
                        }
                    );
                }else{
                    dispatch(actions.doneDeleteTipError(data));
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

    resetProjList: () => ({
        type: 'lists/RESET_PROJLIST'
    }),

    // doneCreateItem: () => ({
    //     type: 'lists/DONE_CREATEITEM',
    // }),

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

    addItemButtonClick: () => ({
        type: 'lists/CLICK_ADDITEMBUTTON',
        // payload: inParam
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

    showResult: inParam => ({
        type: 'lists/SHOW_RESULT',
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

    changeTmRadio2: param =>({
        type: 'lists/CHANGE_TMRADIO2',
        payload: param
    }),

    changeYearRadio2: param =>({
        type: 'lists/CHANGE_YEARRADIO2',
        payload: param
    }),

    beginAddItem: ()=> ({
        type: 'lists/BEGIN_ADDITEM',
    }),

    beginChangeItem: ()=> ({
        type: 'lists/BEGIN_CHANGEITEM',
    }),

    clearProjectContent: projectId => ({
        type: 'lists/CLEAR_PROJECTCONTENT',
        payload: projectId
    }),

    setCanvasWidth2: width => ({
        type: 'lists/SET_CANVASWIDTH',
        payload: width
    }),

    modifyTipsButtonClick: param => ({
        type: 'lists/CLICK_MODIFYTIPSBUTTON',
        payload: param
    }),

    //点击事件详细信息界面下方的修改item按钮(左起第二个按钮)
    modifyItemButtonClick: param => ({
        type: 'lists/CLICK_MODIFYITEMBUTTON',
        payload: param
    }),

    shutChangeTipsModal: () => ({
        type: 'lists/SHUT_CHANGETIPSMODAL',
    }),

    shutChangeItemModal: () => ({
        type: 'lists/SHUT_CHANGEITEMMODAL',
    }),

    zoomButtonClick: ()=>({
        type: 'lists/CLICK_ZOOMBUTTON',
    }),

    beginAddTip: ()=>({
        type: 'lists/BEGIN_ADDTIP',
    }),

    pushItemTipMapList: (projectId,itemId,content)=>({
        type: 'lists/PUSH_ITEMTIPMAPLIST',
        payload: {'projectId':projectId,'itemId':itemId,'content':content}
    }),

    doneAddTip: ()=>({
        type: 'lists/DONE_ADDTIP',
    }),

    doneModifyItem: param=>({
        type: 'lists/DONE_MODIFYITEM',
        payload: param
    }),

};

export default actions;

