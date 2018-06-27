/**
 * Created by liumingyang on 2018/5/2.
 */

//combineReducer方法是在创s建store前用的方法，目的是合并多个不同的reducer；
//接著经过createStore(reducer)创建store后，store中的数据结构就会确立了。
//applyMiddleware方法主要是对redux的dispacth方法进行封装，原理很简单就是将store的dispatch进行替换，换成一个功能增强了但是具有dispach功能的新函数请输入代码，原理和java设计模式中的 装饰者模式很像，旨在增强功能，但不改变接口
//redux-thunk 是一个比较流行的 redux 异步 action 中间件，比如 action 中有 setTimeout 或者通过  fetch 通用远程 API 这些场景，那么久应该使用 redux-thunk 了。redux-thunk 帮助你统一了异步和同步 action 的调用方式，把异步过程放在 action 级别解决，对 component 没有影响
//从右到左来组合多个函数。这是函数式编程中的方法，为了方便，被放到了Redux里。当需要把多个store增强器依次执行的时候，需要用到它。
//<Provider store>使组件层级中的 connect()方法都能够获得 Redux store。正常情况下，你的根组件应该嵌套在 <Provider>中才能使用 connect()方法
//BrowserRouter:包裹整个应用；Route路由对应的组件，可嵌套；Redirect组件，跳转；Switch：只渲染一个子Route组件
//connect： 连接 React 组件与 Redux store。

import React from 'react';
import ReactDom from 'react-dom';
import { createStore,applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import {
	BrowserRouter,
	Route,
	Switch
} from 'react-router-dom';

import Login from './container/login/login';
import Register from './container/register/register';
import BossInfo from './container/bossinfo/bossInfo';
import GeniusInfo from './container/geniusinfo/geniusInfo';
import Dashboard from './component/dashboard/dashBoard';
import Chat from'./component/chat/chat';
import reducers from './reducer';
import './config';
import AuthRoute from './component/authroute/authroute';
import './index.css';

const store = createStore(reducers, compose(
		applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)
);

ReactDom.render(
	(<Provider store={store}>
		<BrowserRouter>
			<div>
				<AuthRoute></AuthRoute>
				<Switch>
					{/* Switch：只要命中一个Route，其他的不管,不加Switch的话，第一个命中会显示，后面命中的也会显示 */}
					<Route path='/bossinfo' component={BossInfo}></Route>
					<Route path='/geniusinfo' component={GeniusInfo}></Route>
					<Route path='/login' component ={Login}></Route>
					<Route path='/register' component={Register}></Route>
					<Route path='/chat/:user' component={Chat}></Route>
					<Route component = {Dashboard}></Route>
				</Switch>
			</div>
		</BrowserRouter>
	</Provider>),
	document.getElementById('root')
);


