/**
 * Created by liumingyang on 2018/5/7.
 */
import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { dataLoad } from '../../redux/user.redux';
import { connect } from 'react-redux';
@withRouter
// 注意connect要放在withRouter下面
@connect(
    null,
    {dataLoad}
)

class AuthRoute extends React.Component {
    componentDidMount() {
        const publicList = ['./login', './register'];
        const pathName = this.props.location.pathname;

        if (publicList.indexOf(pathName) > -1) {
            return null;
        }
        //获取用户信息，有信息时停留在对应页面，无信息则跳转到login页面
        axios.get('./user/info').then(res => {
            if (res.status === 200) {
                if (res.data.code === 0) {
                    //	有登录信息
                    // console.log(res.data)
                    this.props.dataLoad(res.data.data)//将登录信息后台对应的data放入state的user中，不放的话因为是由cookie判断进入的页面所以未获得对应后台的data，只是不拦截这个页面不跳转到login
                } else {
                    this.props.history.push('./login')
                }
            } else {
                alert("请检查网络链接")
            }
        })
    }

    render() {
        return (
            <div></div>
        )
    }
}

export default AuthRoute;