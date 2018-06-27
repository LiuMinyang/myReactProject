/**
 * Created by liumingyang on 2018/5/8.
 */

const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/myapp';

//连接mongoose

mongoose.connect(DB_URL);

// 数据库模型字段
const models = {
    user:{
        'user':{type:String,require:true},
        'pwd':{type:String,require:true},
        'type':{type:String,require:true},
        // -头像
        'avater':{type:String},
        // -简介
        'describe':{type:String},
         // -职位名称
        'title':{type:String},
        // -如果type为Boss，则还有以下两个字段
        'company':{type:String},
        'money':{type:String}
    },
    chat:{
        'chatid':{type:String,require:true},
        'from':{type:String,require:true},
        'to':{type:String,require:true},
        'content':{type:String,require:true,default:''},
        'read':{type:Boolean,default:false},
        'create_time':{type:Number,default:Date.now}
    }
}

// mongoose.connection.on('connected', function () {
// 	console.log('mongo connected success');
// })

// 创建数据库模型
for(let m in models){
    mongoose.model(m,mongoose.Schema(models[m]));
}

// 输出对应的信息，读取模块
module.exports = {
    getModle:function(name){
        return mongoose.model(name);
    }
}

