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


const loggerMiddleware = createLogger();
const store = createStore(
    RootReducer,
    applyMiddleware(thunkMiddleware,loggerMiddleware)
);

render(
    <Provider store={store}>
        {router}
    </Provider>,
    document.getElementById('app')
);

mySocket.init('222.46.16.173','8001','1','6969da5b-1af1-4ade-8f99-7a174c9d1018');