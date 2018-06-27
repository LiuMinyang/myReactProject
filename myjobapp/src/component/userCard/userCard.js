import React from 'react';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import Proptypes from 'prop-types'; //对组件做限制，是否必需，是否必须传参数，传什么参数
import { withRouter } from 'react-router-dom';

@withRouter
class UserCard extends React.Component{
    static Proptypes = {
        userlist:Proptypes.array.isRequired
    }
    handleCLick(v){
        this.props.history.push(`/chat/${v._id}`);//传参
    }
    render(){
        return(
            <div>
                 <WingBlank size="lg">
                    <WhiteSpace size="lg" />
                        {this.props.userlist.map(v=>(
                             v.avater?(<Card key={v._id}
                                        onClick = {()=>this.handleCLick(v)}
                             >
                                            <Card.Header
                                            title={v.user}
                                            thumb={require(`../../component/img/${v.avater}.png`)}
                                            extra={<span>{v.title}</span>}
                                            />
                                            {v.type==="BOSS"?<div>公司名：{ v.company };</div>:null}
                                            <Card.Body>
                                            <div>{v.describe}</div>
                                        </Card.Body>
                                        {v.type==="BOSS"?<div>薪资：{ v.money };</div>:null}
                             </Card>):null
                        ))}
                     <WhiteSpace size="lg" />
                </WingBlank>
            </div>
        )
    }
}

export default UserCard;