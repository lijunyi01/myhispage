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
        // ajax({
        //     url: '/appleBasket/pickApple',
        //     method: 'GET'
        // }).done(data => {
        //     dispatch(actions.donePickApple(data.weight));
        // }).fail(error => {
        //     dispatch(actions.failPickApple(error));
        // });
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
    })

};

export default actions;

