/**
 * Created by liumingyang on 2018/5/8.
 */

import axios from 'axios';
import {getRedirectPath} from '../util'

const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const DATA_LOAD  = 'DATA_LOAD';//用于：有cookie并且在后台能找到对应数据时，将对应cookie的后台数据请求出来放入state中
const LOGOUT = 'LOGOUT';
const initState = {
	redirectTo:'',
	msg:'',
	user:'',
	type:''
}

// reducer,通过接收 state 和 action，并返回新的 state 的函数，当state改变时页面重新渲染，为了把 action 和 state 串起来，开发一些函数
export function user(state=initState,action){
	// 
	switch(action.type){
		case AUTH_SUCCESS:
			return {...state,msg:'',redirectTo:getRedirectPath(action.payload),...action.payload};
		case ERROR_MSG:
			return {...state,msg:action.msg};
		case DATA_LOAD:
			return {...state,...action.payload};
			case LOGOUT:
			return {initState,redirectTo:'/login'}
		default:
		return state;
	}
}


function authSuccess(obj){
	const {pwd,...data} = obj
	return {type:AUTH_SUCCESS,payload:data};
}

function errorMsg(msg) {
	return {msg,type: ERROR_MSG}
}

export function dataLoad(data){
	return {type:DATA_LOAD,payload:data}
}


export function updateData(data){
	console.log(data)
	return dispatch=>{
		axios.post('/user/update',data).then(res=> {
			if (res.status === 200 && res.data.code === 0) {
				
				console.log(res.data)
				dispatch(authSuccess(res.data.data))
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}


// ----开放给其他页面，用于注册时调用该函数传递登录信息，
export function login({user,pwd}) {
	if (!user||!pwd){
		return errorMsg('用户名或密码必须输入！')
	}

	return dispatch=>{
		axios.post('/user/login', {user, pwd}).then(res=> {
			if (res.status === 200 && res.data.code === 0) {
				// 需要提交action的时候用dispatch一下
				// dispatch(loginSuccess({user, pwd}))//-----------------等价于dispatch(registerSuccess（{type:REGISTER_SUCCESS,payload:data}），此写法只是为了统一和美观
				dispatch(authSuccess(res.data.data))
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}

}

// ----开放给其他页面，用于注册时调用该函数传递登录信息，
export function register({user,pwd,repeatpwd,type}) {
	if (!user||!pwd||!type){
		return errorMsg('用户名或密码必须输入！')
	}
	if (pwd!==repeatpwd){
		return errorMsg('两次输入的密码不一致！')
	}

	return dispatch=>{
		axios.post('/user/register', {user, pwd, type}).then(res=> {
			if (res.status === 200 && res.data.code === 0) {
				// 需要提交action的时候用dispatch一下
				dispatch(authSuccess({user, pwd, type}))//-----------------等价于dispatch(registerSuccess（{type:REGISTER_SUCCESS,payload:data}），此写法只是为了统一和美观
			
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}

}

// 退出登录

export function logoutSubmit(){
	return {type:LOGOUT}
}





