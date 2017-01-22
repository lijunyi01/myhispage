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

var inProduction = false;

let middleware = [thunkMiddleware];
//从webpack参数 判断是否是生产打包(是否含有-p 参数)
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
    siteip = '222.46.16.173';
    siteport = '8001';
    umid = '1';
    token = '6969da5b-1af1-4ade-8f99-7a174c9d1018';
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