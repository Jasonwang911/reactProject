import React from 'react';
import ReactDom from 'react-dom';
import {
	createStore,
	applyMiddleware,
	compose
} from 'redux';
import thunk from 'redux-thunk';
import {
	Provider
} from 'react-redux';
import {
	BrowserRouter
} from 'react-router-dom';
// 多个reducers时需要合并reducer
import reducers from './reducer.js'
import './config.js'

import App from './app'

// import Login from './container/login/login.js'
// import Register from './container/register/register'
// import AuthRoute from './component/authroute/authroute'
// import BossInfo from './container/bossinfo/bossinfo'
// import GeniusInfo from './container/geniusinfo/geniusinfo'
// import DashBoard from './component/dashboard/dashboard'
// import Chat from './component/chat/chat'

const store = createStore(reducers, compose(applyMiddleware(thunk),
	window.devToolsExtension ? window.devToolsExtension() : f => f
));


// boss geniuse me msg 4个页面
ReactDom.render(
	(
		<Provider store={store}>
			<BrowserRouter>
				<App></App>
				{/*<div>
					<AuthRoute></AuthRoute>
					<Switch>
						<Route path="/bossinfo" component={BossInfo}></Route>
						<Route path="/geniusinfo" component={GeniusInfo}></Route>
						<Route path="/login" component={Login}></Route>
						<Route path="/register" component={Register}></Route>
						<Route path="/chat/:user" component={Chat}></Route>
						<Route component={DashBoard}></Route>
					</Switch>
				</div> */}
			</BrowserRouter>
		</Provider>
	), document.getElementById('root')
)