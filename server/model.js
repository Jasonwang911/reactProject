// 链接数据库的具体操作
const mongoose = require('mongoose');
// 连接
const DB_URL = 'mongodb://localhost:27017/imooc-chat';

const models = {
	user: {
		'user': {
			type: String,
			require: true
		},
		'pwd': {
			type: String,
			require: true
		},
		'type': {
			type: String,
			require: true
		},
		// 头像
		'avatar': {
			type: String
		},
		// 个人简介或者职位简介
		'desc': {
			type: String
		},
		// 职位名
		'title': {
			type: String
		},
		// boss的独有字段
		'company': {
			type: String
		},
		'money': {
			type: String
		}
	},
	chat: {

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