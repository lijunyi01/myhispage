import React from 'react';
import { render } from 'react-dom';
//<Router history={hashHistory}> 兼容低版本浏览器，前端路由通过＃，例如：http://localhost:8080/#/winner
// import { Router, Route, Link, hashHistory, IndexRoute } from 'react-router';
//import Voting from './components/Voting';
//与纯组件Voting不同，VotingContainer 封装了纯组件和一些逻辑用来与Redux Store协同工作，这些特性是react-redux提供的
// import AppleBasket from './containers/AppleBasket';
import RootReducer from './reducers/RootReducer';
import { createStore,applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import  { Provider } from 'react-redux';
import router from './router';
// import io from 'socket.io-client';
import mySocket from './services/mySocket';

var inProduction = true;

let middleware = [thunkMiddleware];

if(!inProduction){
    let loggerMiddleware = createLogger();
    middleware = [ ...middleware,loggerMiddleware];
}

const store = createStore(
    RootReducer,
    applyMiddleware(...middleware)
);


let siteip;
let siteport;
let umid;
let token;
if(!inProduction) {
    siteip = 'usanode1.51his.com';
    siteport = '8443';
    umid = '1';
    token = 'f4fa4a9d-8e93-42ba-8b64-861b1fd2b031';
}else {
    umid = localStorage.getItem("umid");
    token = localStorage.getItem("token");
    siteip = localStorage.getItem("siteip");
    siteport = localStorage.getItem("siteport");
}
//实际通过登录页面传递参数(直接传或通过本地存储传)
mySocket.init(siteip,siteport,umid,token);

// store.dispatch({
//     type: 'lists/SET_JUSTLOGIN',
// });

render(
    <Provider store={store}>
        {router}
    </Provider>,
    document.getElementById('app')
);