/**
 * Created by liumingyang on 2018/5/7.
 */
import React from 'react';
import { Redirect } from 'react-router-dom';
import Logo from '../../component/logo/logo'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile';
import {connect} from 'react-redux';
import {login} from '../../redux/user.redux';
import AppForm from '../../component/appForm/appForm';
@connect(
	state=>state.user,
	{login}
)

@AppForm
class Login extends React.Component{
	constructor(props) {
		super(props);
		this.register = this.register.bind(this);
		this.handleLogin =  this.handleLogin.bind(this);
	}


	register() {
		this.props.history.push('./register')
	}

	handleLogin(){
		this.props.login(this.props.state)
	}
	render(){
		return(
			<div>
				<Logo></Logo>
				{this.props.redirectTo&&this.props.redirectTo!=='/login'?<Redirect to={this.props.redirectTo}></Redirect>:null}
				{/* <h2>登录页面</h2> */}
				<WingBlank>
					<List>
						{this.props.msg?<p className="errMsg_p">{this.props.msg}</p>:null}
						<InputItem onChange={v=>this.props.handleChange('user',v)}>用户</InputItem>
						<WhiteSpace />
						<InputItem type="password" onChange={v => this.props.handleChange('pwd', v)}>密码</InputItem>
					</List>
					<WhiteSpace />
					<Button type="primary" onClick={this.handleLogin}>登录</Button>
					<WhiteSpace />
					<Button type="primary" onClick={this.register}>注册</Button>
				</WingBlank>
			</div>

		)
	}
}

export default Login;