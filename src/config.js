import axios from 'axios';
// 
import {
	Toast
} from 'antd-mobile';

// 拦截器
axios.interceptors.request.use(function(config) {
	Toast.loading('加载中', 0)
	return config;
})
// 
axios.interceptors.response.use(function(config) {
	Toast.hide();
	return config;
})