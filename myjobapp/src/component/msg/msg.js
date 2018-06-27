import React from 'react';
import { connect } from 'react-redux';
import { List,Badge } from 'antd-mobile';
@connect(
    state=>state
)
class MsgList extends React.Component{
    render(){
        const chatmsgArr = {};
        const chatmsg =this.props.chat.chatmsg;
        chatmsg.forEach(v => {
            chatmsgArr[v.chatid] = chatmsgArr[v.chatid]||[]
            chatmsgArr[v.chatid].push(v);
        });
        let chatListArr = Object.values(chatmsgArr).sort((a,b)=>{
            const a_last = a[a.length-1].create_time;
            const b_last = b[b.length-1].create_time;
            console.log(a_last+":"+b_last)
            return b_last-a_last
        });
        console.log(chatListArr)
        const Item = List.Item;
        const Brief = List.Item.Brief;
        return(
            <div>
                {chatListArr.map((v,index)=>{
                    const targetId = v[v.length-1].from==this.props.user._id?v[v.length-1].to:v[v.length-1].from;
                    const targetName=this.props.chat.usersBasicMsg[targetId]?this.props.chat.usersBasicMsg[targetId].name:'';
                    const targetAvater=this.props.chat.usersBasicMsg[targetId]?this.props.chat.usersBasicMsg[targetId].avater:'';
                    const unreadNum = v.filter(v=>v.read===false&&v.to===this.props.user._id).length;
                    return(
                            <List key={index}>
                                <Item
                                extra={<Badge text={unreadNum} style={{marginTop:-5}}></Badge>}
                                thumb={require(`../img/${targetAvater}.png`)}
                                arrow="horizontal"
                                onClick = {()=>{this.props.history.push(`/chat/${targetId}`)}}
                                >
                                        {v[v.length-1].content}
                                    <Brief key={index}>{targetName}</Brief> 
                                </Item>
                            </List>
                        )
                })}
            </div>
        )   
    }
} 

export default MsgList;

