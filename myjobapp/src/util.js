
//用于页面跳转

export function getRedirectPath({type,avater}){
    // 根据用户信息跳转到指定页面
    // user.type  /boss /genius
    // user.avator /bossinfo /geniusinfo
    let url = (type==='BOSS')?'/boss':'/genius';
    // debugger;
    if(!avater){
        url+='info';
    }
    return url;
}

export function getChatId(fromId,toId){
    return [fromId,toId].sort().join('_');
}