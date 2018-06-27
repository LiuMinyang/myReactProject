import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Result,List,WhiteSpace,Modal } from 'antd-mobile';
import browserCookies from 'browser-cookies';
import { logoutSubmit } from '../../redux/user.redux';


@connect(
    state => state.user,
    { logoutSubmit }
)

class User extends React.Component{
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout(){
        const alert = Modal.alert;
        // browserCookies.erase('userId');
        alert('退出', '确定退出吗', [
            { text: '取消', onPress: () => {}},
            { text: '确认', onPress: () => {
                browserCookies.erase('userId');
                this.props.logoutSubmit();//清空redux数据，并在redux中定义跳转页面redirectTo属性，跳转到登录页
            }},
          ])
    }
    render(){
        console.log(this.props)
        return this.props.user?(
            <div>
                <Result
                    img={<img src={require(`../img/${this.props.avater}.png`)} alt="图像" style={{width:50}}/>}
                    title = {this.props.user}
                    message = {this.props.type==="BOSS"?this.props.company:null}
                ></Result>
                <List>
                    <List.Item multipleLine >
                        {this.props.title}
                        {this.props.describe.split('\n').map(v=><List.Item.Brief key={v}>{this.props.describe}</List.Item.Brief>)}
                        {this.props.money?<List.Item.Brief>薪资：{this.props.money}</List.Item.Brief>:null}
                    </List.Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    <List.Item multipleLine onClick={this.logout}>
                       退出登录
                    </List.Item>
                </List>
                
            </div>  
        ):<Redirect to={this.props.redirectTo}></Redirect>
    }
}

export default User;