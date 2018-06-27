/**
 * Created by liumingyang on 2018/4/27.
 */
const express = require('express');
const model =  require('./modle');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const Chat = model.getModle('chat');

// socket.io和express混合使用，若单独使用只需const io = require("socket.io")
const app = express();
const server = require('http').Server(app);
const io = require("socket.io")(server)
const userRouter = require('./user');
// socket.io和express混合使用
// const app = express();
// Chat.remove({},function(ree,data){});//删除会话内容
io.on('connection',function(socket){
	// 注意，socket和io的区别，前者是当前连接请求，后者是全局请求
	socket.on('sendMsg',function(data){
		const {from,to,msg} = data;
		const chatid = [from,to].sort().join('_');
		Chat.create({chatid,from,to,content:msg},function(err,doc){ //先将发送过来的数据入库（数据库）
			io.emit('resMsg',Object.assign({},doc._doc))//把接收到的data发送给全局，这样前台就可以拿到数据了
		})
	})
})

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter);

app.get('/',function (req,res) {
	res.send('<h1>Hello,This is The Data Of My App</h1>')
})

server.listen(9093,function () {
	console.log("node app start at 9093")
})
