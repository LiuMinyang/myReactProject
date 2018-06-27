import axios from 'axios';

const USER_LIST = 'USER_LIST';

const initState = {
    userlist:[]
}

// reducer,通过接收 state 和 action，并返回新的 state 的函数，当state改变时页面重新渲染，为了把 action 和 state 串起来，开发一些函数
export function chatuser(state=initState,action){
	switch(action.type){
        case USER_LIST:
			return {...state,userlist:action.payload};
		default:
		return state;
	}
}

function userlist(data){
    
    return {type:USER_LIST,payload:data}
}

export function getUserList(type){
    return dispatch=>{
        axios.get('/user/list?type='+type).then(res=>{
            if(res.data.code===0){
                
                dispatch(userlist(res.data.data));
            }
        })
    }
}