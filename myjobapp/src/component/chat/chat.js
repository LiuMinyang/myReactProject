import React from 'react';
import { List,InputItem,NavBar,Icon,Grid} from 'antd-mobile';
// import io from 'socket.io-client';
import { connect } from 'react-redux';
import{ getChatId } from '../../util'
import { getMsgList,sendMsg,recvMsg,readMsg } from '../../redux/chat.redux';
// 因为在此项目中牵扯到跨域，所以括号内放上server的地址，若不跨域则io();就可以


// const socket = io('ws://localhost:9093');
@connect(
    state=>state,
    {getMsgList,sendMsg,recvMsg,readMsg}
)

class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            text:'',
            msg:[]
        }
        // this.handleClickSubmit = this.handleClickSubmit.bind(this);
    }
    componentDidMount(){
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList();
            this.props.recvMsg();//用户
        }
        var to = this.props.match.params.user;
        this.props.readMsg(to);
    }

    fixCarousel(){
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'))
        }, 0)
    }

    handleClickSubmit(){
        console.log(this.props.user)
        const from = this.props.user._id;
        const to = this.props.match.params.user;
        const msg = this.state.text;
        this.props.sendMsg({from,to,msg});
        this.setState({//发送完之后清空text
            text:'',
            showEmoji:false
        });
    }

    render(){
        console.log(this.props.chat.chatmsg)
        const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '.split(' ').filter(v=>v).map(v=>(
            {text:v}
        ))
   
        const userid = this.props.match.params.user;
        const users = this.props.chat.usersBasicMsg;
       
        const chatid =  getChatId(userid,this.props.user._id);
        const chatmsg = this.props.chat.chatmsg.filter(v=>v.chatid===chatid);
        if(!users[userid]){
            return null;
        }
        const Item = List.Item;
        return(
            <div id="chat-page">
                <NavBar
               icon= {<Icon type="left" />}

               onLeftClick={() =>{ this.props.history.goBack()}}
                mode="dark">
                    {users[userid].name}
                </NavBar>
                <div className = "am-list-content">
                {chatmsg.map((v,index)=>{
                    const avater = require(`../img/${users[v.from].avater}.png`);
                    // debugger;
                    return v.from===userid?(
                        <List key={index}>
                            <Item
                            thumb = {avater}
                            >对方:{v.content}</Item>
                        </List>
                    ):(
                        <List key={index}>
                            <Item
                            extra = {<img src={avater} alt='图片'/>}
                            className="chat-me">我:{v.content}</Item>
                         </List>
                    );
                })}

                </div>
                <div className="stick-footer">
                    {/* <h2>chat with user:{this.props.match.params.user}</h2> */}
                    <List>
                        <InputItem
                            type='text'
                            value={this.state.text}
                            onChange = {v=>{
                                this.setState(
                                    {
                                        text:v
                                    }
                                )
                                
                            }}
                            extra = {<div>
                                <span style={{marginRight:15}} onClick={()=>{
                                    this.setState({showEmoji:!this.state.showEmoji})
                                    this.fixCarousel()}}>😅</span>
                                <span  onClick={()=>this.handleClickSubmit()}>发送</span>
                                </div>
                            }
                        >
                        </InputItem>
                    </List>
                   {this.state.showEmoji?<Grid
                        data = {emoji}
                        columnNum={9}
                        carouselMaxRow={4}
                        isCarousel
                        onClick={
                            el=>{
                                this.setState({
                                    text:this.state.text+el.text
                                })
                            }
                        }
                    ></Grid>:null} 
                </div>
            </div>
        )
    }
}

export default Chat;