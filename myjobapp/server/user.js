/**
 * Created by liumingyang on 2018/5/8.
 */
const express = require('express');
const cookieParser = require('cookie-parser');
const Router = express.Router();
const utils = require('utility');//简单加密
const model =  require('./modle');
const User = model.getModle('user'); 
const Chat = model.getModle('chat');

const _filter = {'pwd':0,'_v':0}

Router.get('/list',function (req,res) {
	// User.remove({},function(err,doc){})
	const type = req.query.type;
	User.find({type},function(err,doc){
		return res.json({code:0,data:doc});
	})
})


Router.post('/update',function(req,res){
	const userid = req.cookies.userId
	if (!userid) {
		return res.json({code:1})
	}
	const body = req.body
	User.findByIdAndUpdate(userid,body,function(err,doc){//查找并且更新findByIdAndUpdate
		const data = Object.assign({},{
			user:doc.user,
			type:doc.type
		},body)
		return res.json({code:0,data})
	})
})
Router.post('/register',function(req,res){
// 读取前段传过来的数据，和数据库中的user做对比，若已存在相应user，则用户名重复不可添加，反之则可以添加，并在数据库中记录下相应信息
	const {user,pwd,type} = req.body;

	User.findOne({user:user},function(err,doc){
		if(doc){
			return res.json({code:1,msg:'用户名重复'})
		}
		const userModel = new User({user,pwd:md5Password(pwd),type});
		userModel.save(function(e,d){
			if(e){
				return res.json({code:1,msg:'后端出错了'})
			}
			const {user,pwd,_id} = d;//将d中对应的user等，赋值给user、pwd、_id
			res.cookie('userId',_id);
			return res.json({code:0,data:{user,pwd,_id}})
		})
	})
})

Router.post('/login',function(req,res){
// 读取前段传过来的数据，和数据库中的user做对比，若已存在相应user，则用户名重复不可添加，反之则可以添加，并在数据库中记录下相应信息
	const {user,pwd} = req.body;
	User.findOne({user,pwd:md5Password(pwd)},_filter,function(err,doc){
		if(!doc){
			return res.json({code:1,msg:'用户名不存在或密码错误'})
		}
		res.cookie('userId',doc._id);
		return res.json({code:0,data:doc})
	})
})


function md5Password(pwd){
	const pasInfo = 'assssss123_*&2222_^%_____AD|91';
	pwd = utils.md5(utils.md5(pwd+pasInfo));
	return pwd;
}

Router.get('/info',function (req,res) {
	const {userId} = req.cookies;
	if(!userId){
		return res.json({code:1});
	}
	User.findOne({'_id':userId},function(err,doc){
		if(err){
			return res.json({code:1,msg:'后台错误'})
		}
		if(doc){
			return res.json({code:0,data:doc})
		}
	})
	
})

Router.get('/getmsglist',function (req,res) {
	// User.remove({},function(err,doc){})
	const user = req.cookies.userId;
	User.find({},function(err,userdata){
		var usersBasicMsg = {};
		userdata.forEach(v=>{
			usersBasicMsg[v._id] = {name:v.user,avater:v.avater};
		})

		Chat.find({'$or':[{from:user},{to:user}]},function(err,doc){
			if(!err){
				return res.json({code:0,msgs:doc,usersBasicMsg:usersBasicMsg});
			}
			
		})
	})
	
})

Router.post('/readmsg',function(req,res){
	const {from} = req.body;
	const to = req.cookies.userId;
	Chat.update(
		{from:from,to:to},
		{"$set":{read:true}},
		{'multi':true},//设置多行，修改多条信息（全部）
		function(err,doc){
			console.log(doc)
			if(!err){
				return res.json({code:0,num:doc.nModified})
			}else{
				return res.json({code:1,msg:'请求失败'})
			}
		}
	)
})

module.exports = Router;