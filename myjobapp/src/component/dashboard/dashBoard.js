import React from 'react';
import {connect} from 'react-redux';
import { NavBar } from 'antd-mobile';
import NavLinkBar from '../navlink/navLinkBar';
import { Switch,Route } from 'react-router-dom';

import Boss from '../../container/boss/boss';
import Genius from '../../container/genius/genius';
import User from '../user/user';
import { getMsgList,recvMsg } from '../../redux/chat.redux';
import MsgList from '../msg/msg'
@connect(
	state => state,
	{ getMsgList,recvMsg }
)
class Dashboard extends React.Component{
	
	componentDidMount(){
		if(!this.props.chat.chatmsg.length){
			this.props.getMsgList();
			this.props.recvMsg();
		}
    }
    
    render(){
        const {pathname} = this.props.location
        const user = this.props.user;
        const navList = [
			{
				path:'/boss',
				text:'牛人',
				icon:'boss',
				title:'牛人列表',
				component:Boss,
				hide:user.type==='genius'
			},
			{
				path:'/genius',
				text:'boss',
				icon:'job',
				title:'BOSS列表',
				component:Genius,
				hide:user.type==='BOSS'
			},
			{
				path:'/msg',
				text:'消息',
				icon:'msg',
				title:'消息列表',
				component:MsgList
			},
			{
				path:'/me',
				text:'我',
				icon:'user',
				title:'个人中心',
				component:User
			}
        ]

		let page =navList.find(v=>v.path===pathname);
		page = page?page:{title:'其他404页面'}
        return(
            <div>
               <NavBar className="appHeader" mode="dark">{page.title}</NavBar>
               <div style={{marginTop:45}}>
			   		<Switch>
						{
							navList.map(v=>(
								<Route key={v.path} path={v.path} component = {v.component}></Route>
							))
						}
					</Switch>
			   </div>
               <NavLinkBar className="appFooter" data={navList}></NavLinkBar>
            </div>
        )
    }
  
}

export default Dashboard;
















