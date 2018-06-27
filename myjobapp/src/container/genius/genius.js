import React from 'react';
// import axios from 'axios';
// import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import {connect} from 'react-redux';

import { getUserList } from '../../redux/chatuser.redux';
import UserCard from '../../component/userCard/userCard';

@connect(
    state => state.chatuser,
    { getUserList }
)

class Genius extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:[]
        }
    }

    componentDidMount(){
        this.props.getUserList('BOSS');
      
    }
    render(){

        return(
            <div>
                <UserCard userlist={ this.props.userlist }></UserCard>
            </div>
        )
    }
}

export default Genius;