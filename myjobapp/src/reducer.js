/**
 * Created by liumingyang on 2018/5/4.
 */
//combineReducer方法是在创建store前用的方法，目的是合并多个不同的reducer；
import { combineReducers } from 'redux';

import { user } from './redux/user.redux';
import { chatuser } from  './redux/chatuser.redux';
import { chat } from  './redux/chat.redux';
export default combineReducers({user,chatuser,chat});




