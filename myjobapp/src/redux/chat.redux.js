// import React from 'react';
import axios from 'axios';
import io from 'socket.io-client';
// 因为在此项目中牵扯到跨域，所以括号内放上server的地址，若不跨域则io();就可以
const socket = io('ws://localhost:9093');

const MSG_LIST = 'MSG_LIST';
const REC_MSG = 'REC_MSG';
const MSG_READ = 'MSG_READ';

const initState = {
    chatmsg:[],
    usersBasicMsg:{},
    unread:0
}

export function chat(state=initState,action){
    switch(action.type){
        case MSG_LIST:
        return {...state,usersBasicMsg:action.payload.usersBasicMsg,chatmsg:action.payload.data,unread:action.payload.data.filter(v=>!v.read&&v.to===action.payload.userid).length};
        case REC_MSG:
        const n = action.payload.to === action.userid?1:0;
        return {...state,chatmsg:[...state.chatmsg,action.payload],unread:state.unread+n};
        case MSG_READ:
        
        console.log(state.unread+":"+action.payload.num)
        return {...state,chatmsg:state.chatmsg.map(v=>{
            v.read = v.from==action.payload.from?true:v.read;
              return v;
        }),unread:state.unread-action.payload.num};
        default:
        return state;
    }
}

function Msg_list(data,usersBasicMsg,userid){
    return {type:MSG_LIST,payload:{data,usersBasicMsg,userid}};
}

function Rec_msg(msg,userid){
    return {type:REC_MSG,payload:msg,userid};
}

function msgRead({from,userId,num}){
    
    return {type:MSG_READ,payload:{from,userId,num}};
}

export function getMsgList(){
    return (dispatch,getState)=>{
        axios.get('/user/getmsglist').then(res=>{
            if(res.status===200&&res.data.code===0){
                const userid = getState().user._id
                dispatch(Msg_list(res.data.msgs,res.data.usersBasicMsg,userid));
            }
        })
    }
}

export function recvMsg(){
    return (dispatch,getState)=>{
        socket.on('resMsg',function(msg){
            const userid = getState().user._id
                dispatch(Rec_msg(msg,userid));
           
        })
    }
}

export function sendMsg({from,to,msg}){
    return dispatch=>{
        socket.emit('sendMsg',{from,to,msg})
    }
}

 
export function readMsg(from){
        return  (dispatch,getState)=>{
            axios.post('/user/readmsg',{from}).then(res=>{
                const userId = getState().user._id;
                if(res.status==200&&res.data.code==0){
                    dispatch(msgRead({from,userId,num:res.data.num}))
                }
            })
        }
}