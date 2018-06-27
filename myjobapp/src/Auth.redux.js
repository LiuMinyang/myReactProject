/**
 * Created by liumingyang on 2018/5/3.
 */

import axios from "axios";
const LOGIN = 'LOGIN';

const LOGOUT = 'LOGOUT';

const USERDATA = "USERDATA";

const initState = {
    isAuth: false,
    user: '信息系统',
    age: 20
}

//-------------改变state传入action的type，根据type的不同进行渲染
export function auth(state = initState, action) {
    console.log(state, action)
    switch (action.type) {
        case LOGIN:
            return {...state, isAuth: true };
        case LOGOUT:
            return {...state, isAuth: false };
        case USERDATA:
            return {...state, ...action.resData };
        default:
            return state;
    }
}

// action

export function getUserData() {
    // dispatch用来通知数据修改
    return dispatch => {
        axios.get('/data').then(res => {
            if (res.status === 200) {
                dispatch(userData(res.data));
            }
        })
    }
}

export function userData(data) {
    return { type: USERDATA, resData: data }
}



export function login() {
    return { type: LOGIN }
}

export function logout() {
    return { type: LOGOUT }
}