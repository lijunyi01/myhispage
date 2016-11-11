/**
 * Created by ljy on 16/9/13.
 * 本文件定义了 action creators (相当于工厂)
 */

import mySocket from '../services/mySocket';

// import ajax from '../services/ajax'; //经过封装的加强型 ajax 函数

//这是名空间，对普通action做划分
// const prefix = 'apple/';

let actions = {

    //注意这里需要 () => ... , 不然 pickAppleAction 不是一个actionCreator, 而是一个thunk
    pickApple: () => (dispatch, getState) => {

        //如果正在摘苹果，则结束这个thunk, 不执行摘苹果
        if(getState().isPicking)
            return;

        //通知开始摘苹果
        dispatch(actions.beginPickApple());

        //发送摘苹果请求
        // mySocket.siteip = '222.46.16.173';
        // mySocket.siteip = '192.168.8.153';
        // mySocket.siteport = '8001';
        // mySocket.umid = '10000000';
        // mySocket.token = 'eatappletesttoken';

        mySocket.init('222.46.16.173','8001','10000000','eatappletesttoken');
        mySocket.emit(
            'pickapple',
            {},
            (data)=>{
                // console.log(data);
                if(data.errorCode=='0'){
                    let genAckContent = data.generalAckContent;
                    console.log(genAckContent);
                    dispatch(actions.donePickApple(10));
                }else{
                    console.log('data error');
                }
            }
        );
        // ajax({
        //     url: '/appleBasket/pickApple',
        //     method: 'GET'
        // }).done(data => {
        //     dispatch(actions.donePickApple(data.weight));
        // }).fail(error => {
        //     dispatch(actions.failPickApple(error));
        // });
    },

    beginPickApple: () => ({
        type: 'apple/BEGIN_PICK_APPLE'
    }),

    donePickApple: appleWeight => ({
        type: 'apple/DONE_PICK_APPLE',
        payload: appleWeight
    }),

    failPickApple: error => ({
        type: 'apple/FAIL_PICK_APPLE',
        payload: error,
        error: true
    }),

    eatApple: appleId => ({
        type: 'apple/EAT_APPLE',
        payload: appleId
    })

};

export default actions;

