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

class Boss extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:[]
        }
    }

    componentDidMount(){
        this.props.getUserList('genius')
    }
    render(){
        return(
            <div>
                 {/* <WingBlank size="lg">
                    <WhiteSpace size="lg" />
                        {this.props.userlist.map(v=>(
                             v.avater?(<Card key={v._id}>
                                            <Card.Header
                                            title={v.user}
                                            thumb={require(`../../component/img/${v.avater}.png`)}
                                            extra={<span>{v.title}</span>}
                                            />
                                            <Card.Body>
                                            <div>{v.describe}</div>
                                        </Card.Body>
                             </Card>):null
                        ))}
                     <WhiteSpace size="lg" />
                </WingBlank> */}
                <UserCard userlist = { this.props.userlist }></UserCard>
            </div>
        )
    }
}

export default Boss;