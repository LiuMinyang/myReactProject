import React from 'react';
import { NavBar, Icon ,InputItem, TextareaItem , WhiteSpace, Button} from 'antd-mobile';
import AvatorSelector from '../../component/avater-selector/avatorSelector';
import { connect } from 'react-redux';
import { updateData } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom';

@connect(
    state => state.user,
    { updateData }
)
class GeniusInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title:'',
            describe:'',
            company:'',
            money:''
        }
    }
    handleChange(key,v){
        this.setState(
            {
                [key]:v
            }
        )
    }
    
    render(){
        const path = this.props.location.pathname;
        const redirect = this.props.redirectTo
       
        return(
            <div>
                {redirect&&redirect!==path?<Redirect to={redirect}></Redirect>:null}
                <NavBar mode="dark" icon={<Icon type="left" />}  rightContent={[<Icon key="1" type="ellipsis" />,]}>牛人信息完善页</NavBar>
                <AvatorSelector selectAvatar={imgname=>{
                    this.setState({
                        avater:imgname
                    })
                }}></AvatorSelector>
                <WhiteSpace></WhiteSpace>
                <InputItem onChange={v=>this.handleChange('title',v)}>求职岗位</InputItem>
                <TextareaItem rows="3" autoHeight onChange={v=>this.handleChange('describe',v)} title='自我简介'></TextareaItem >
                <Button type="primary" onClick={()=>{this.props.updateData(this.state)}}>保存</Button>
            </div>
        )
    }
}

export default GeniusInfo;