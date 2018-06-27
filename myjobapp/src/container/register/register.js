/**
 * Created by liumingyang on 2018/5/7.
 */
import React from 'react';
import { Redirect } from 'react-router-dom';
import Logo from '../../component/logo/logo';
import { List,InputItem,Radio,WhiteSpace,Button } from 'antd-mobile';
import {connect} from 'react-redux';
import {register} from '../../redux/user.redux';
import AppForm from '../../component/appForm/appForm';

@connect(
	state => state.user,
	{register}
)
@AppForm
class Register extends  React.Component{

	constructor(props){
		super(props);
		this.handleRegister = this.handleRegister.bind(this);
	}

	componentDidMount(){
		this.props.handleChange('type','genius')
	}

	handleRegister(){
		this.props.register(this.props.state);
	}


	render(){
		const RadioItem = Radio.RadioItem;
		return(
			<div>
				{this.props.redirectTo?<Redirect to={this.props.redirectTo}></Redirect>:null}
				<Logo></Logo>
			<List>
				{this.props.msg?<p className="errMsg_p">{this.props.msg}</p>:null}
					<InputItem onChange={v=>this.props.handleChange('user',v)}>用户</InputItem>
					<WhiteSpace />
					<InputItem type="password" onChange={v => this.props.handleChange('pwd', v)}>密码</InputItem>
					<WhiteSpace />
					<InputItem type="password" onChange={v => this.props.handleChange('repeatpwd', v)}>确认密码</InputItem>
					<WhiteSpace />
					<RadioItem checked={this.props.state.type === 'genius'} onChange={v => this.props.handleChange('type', 'genius')}>牛人</RadioItem>

					<RadioItem checked={this.props.state.type === 'boss'} onChange={v => this.props.handleChange('type', 'BOSS')}>BOSS</RadioItem>
					<WhiteSpace />
					<Button onClick={this.handleRegister} type='primary'>注册</Button>
				</List>
			</div>
		)
	}
}

export default Register;