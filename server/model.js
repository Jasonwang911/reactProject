// 链接数据库的具体操作
const mongoose = require('mongoose');
// 连接
const DB_URL = 'mongodb://localhost:27017/imooc-chat';

const models = {
	// 用户相关的数据模型
	user: {
		'user': {
			'type': String,
			'require': true
		},
		'pwd': {
			'type': String,
			'require': true
		},
		'type': {
			'type': String,
			'require': true
		},
		// 头像
		'avatar': {
			'type': String
		},
		// 个人简介或者职位简介
		'desc': {
			'type': String
		},
		// 职位名
		'title': {
			'type': String
		},
		// boss的独有字段
		'company': {
			'type': String
		},
		'money': {
			'type': String
		}
	},
	// 聊天的数据模型
	chat: {
		'chatid': {
			'type': String,
			'require': true
		},
		'read': {
			'type': Boolean,
			'default': false
		},
		'from': {
			'type': String,
			'require': true
		},
		'to': {
			'type': String,
			'require': true
		},
		content: {
			'type': String,
			'require': true,
			'default': ''
		},
		'create_time': {
			'type': Number,
			'default': new Date().getTime()
		}
	}
}

// 批量动态生成注册
for (let m in models) {
	mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
	getModel: function(name) {
		return mongoose.model(name);
	}
}

mongoose.connect(DB_URL);
mongoose.connection.on('connected', function() {
	console.log('mongo connect success!');
});