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

    doneGetAllProjects: data => ({
        type: 'lists/DONE_GETALLPROJECTS',
        payload: data
    }),

    failPickApple: error => ({
        type: 'apple/FAIL_PICK_APPLE',
        payload: error,
        error: true
    }),

    clickItem: id => ({
        type: 'lists/CLICK_ITEM',
        payload:id
    }),

    pushProjectContent: (id,content) => ({
        type: 'lists/PUSH_PCONTENT',
        payload:{'id':id,'content':content}
    })

};

export default actions;

