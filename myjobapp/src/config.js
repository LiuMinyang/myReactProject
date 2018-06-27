/**
 * Created by liumingyang on 2018/5/6.
 */
import axios from 'axios';
import {Toast} from 'antd-mobile';

//拦截请求
axios.interceptors.request.use(function(config){
	Toast.loading('加载中',0);
	return config;
})

axios.interceptors.response.use(function (config) {
	Toast.hide();
	return config;
})

