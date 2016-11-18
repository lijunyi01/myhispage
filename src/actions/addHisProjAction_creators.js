/**
 * Created by ljy on 16/9/13.
 * 本文件定义了 action creators (相当于工厂)
 */

import mySocket from '../services/mySocket';

// import ajax from '../services/ajax'; //经过封装的加强型 ajax 函数

//这是名空间，对普通action做划分
const prefix = 'myhis/';

let actions = {

    //注意这里需要 () => ... , 不然 createProj 不是一个actionCreator, 而是一个thunk
    createProj: () => (dispatch, getState) => {

        //如果正在提交，则结束这个thunk, 不执行
        if(getState().isSubmitting)
            return;

        // console.log("create project");

        //通知开始提交
        dispatch(actions.beginSubmit());

        //发送create project请求
        mySocket.init('222.46.16.173','8001','1','6969da5b-1af1-4ade-8f99-7a174c9d1018');
        mySocket.emit(
            'createProject',
            {projectName:'project1',projectDes:'project1 desc'},
            (data)=>{
                console.log(data);
                if(data.errorCode=='0'){
                    // let genAckContent = data.generalAckContent;
                    // let contentJson = JSON.parse(genAckContent);
                    dispatch(actions.doneSubmit(data));
                }else{
                    dispatch(actions.doneSubmit(data));
                    console.log('data error');
                }
            }
        );

    },

    beginSubmit: () => ({
        type: 'myhis/BEGIN_SUBMIT'
    }),

    doneSubmit: retMessage => ({
        type: 'myhis/DONE_SUBMIT',
        payload: retMessage
    }),

    failSubmit: error => ({
        type: 'myhis/FAIL_SUBMIT',
        payload: error,
        error: true
    }),

    shutMyModal: () => ({
        type: 'myhis/SHUT_MYMODAL',
    })

    // eatApple: appleId => ({
    //     type: 'apple/EAT_APPLE',
    //     payload: appleId
    // })

};

export default actions;

