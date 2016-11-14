import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// Layout
import MainLayout from './view/layout/main-layout';
// Pages or Containers
import Home from './view/pages/Home';

import MyHisList from './view/containers/MyHisList';
import AddHisProj from './view/containers/AddHisProj';

export default (
    <Router history={browserHistory}>
        {/*省略path属性,表示不管路径是否匹配，总是会加载指定组件;嵌套表示先加载外层的组件,再加载内层的组件*/}
        <Route component={MainLayout}>
            <Route path="/" component={Home} />

            <Route path="/myHisList">
                <IndexRoute component={MyHisList} />
                {/*<Route component={AppleBasket}>*/}
                    {/*<IndexRoute component={AppleBasket} />*/}
                {/*</Route>*/}
                {/*<Route path=":userId" component={UserProfileContainer} />*/}
            </Route>

            <Route path="/addHisProj">
                <IndexRoute component={AddHisProj} />
            </Route>

            {/*<Route path="widgets">*/}
                {/*<Route component={SearchLayoutContainer}>*/}
                    {/*<IndexRoute component={WidgetListContainer} />*/}
                {/*</Route>*/}
            {/*</Route>*/}

        </Route>
    </Router>
);