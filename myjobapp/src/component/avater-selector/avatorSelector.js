import React from 'react';
import { List,Grid } from 'antd-mobile';
import Proptypes from 'prop-types'; //对组件做限制，是否必需，是否必须传参数，传什么参数

class AvatorSelector extends React.Component{

    static propTypes = {
        selectAvatar:Proptypes.func.isRequired
    }

    constructor(props){
        super(props);
        this.state = {

        }
    }

  
    render(){
        const dataList = 'boy,bull,chick,crab,girl,hedgehog,hippopotamus,koala,lemur,man,pig,tiger,whale,woman,zebra'.split(",").map(v=>({
            icon:require(`../img/${v}.png`),
            text:v
        }))
        const gridHeader = this.state.text?<div><span>已选择图像</span><img style={{width:20}} src={this.state.icon} alt=""/></div>:<div>请选择图像</div>;
        return(
            <div>
                <List renderHeader={()=>gridHeader}> 
                <Grid data={dataList} columnNum="5" hasLine="true" onClick={elem=>{
                    this.setState(elem)
                    this.props.selectAvatar(elem.text)
                }}>头像选择</Grid>
                </List>
             
            </div>
        )
    }
}

export default AvatorSelector;