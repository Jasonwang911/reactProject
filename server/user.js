const express = require('express');
const Router = express.Router();
const utils = require('utility');
const models = require('./model');
const User = models.getModel('user');
const Chat = models.getModel('chat');

// 统一的查询条件,禁止查询密码和文档
const _filter = {
	'pwd': 0,
	'__v': 0
};

Router.get('/list', (req, res) => {
	// 获取查询参数
	const {
		type
	} = req.query;

	// 清除所有数据
	// User.remove({}, (e, d) => {});
	User.find({
		type
	}, (err, doc) => {
		if (err) console.log(err)
		return res.json({
			code: 0,
			data: doc
		});
	});
});

// 获取 聊天列表
Router.get('/getmsgList', (req, res) => {
	const user = req.cookies.userid;
	let users = {};
	// 查询用户信息， 这一步和下一步是做的相当于mySQL的联表操作
	User.find({}, (err, userdoc) => {
		userdoc.forEach(v => {
			users[v._id] = {
				name: v.user,
				avatar: v.avatar
			}
		})
	});
	// 查询消息列表 {'$or':[{from:user,to:user}]} 
	Chat.find({
		'$or': [{
			from: user
		}, {
			to: user
		}]
	}, (err, doc) => {
		if (!err) {
			return res.json({
				code: 0,
				msgs: doc,
				users: users
			});
		} else {
			return res.json({
				code: 1,
				msg: '后台错误'
			});
		}
	});
});

// 个人详细信息提交页面
Router.post('/update', (req, res) => {
	const userid = req.cookies.userid;
	if (!userid) {
		return json.jumps({
			code: 1
		});
	}
	const body = req.body;
	User.findByIdAndUpdate(userid, body, (err, doc) => {
		const data = Object.assign({}, {
			user: doc.user,
			type: doc.type
		}, body);
		return res.json({
			code: 0,
			data
		});
	})
});

Router.post('/login', (req, res) => {
	const {
		user,
		pwd
	} = req.body;
	User.findOne({
		user,
		pwd: md5Pwd(pwd)
	}, _filter, (err, doc) => {
		if (!doc) {
			return res.json({
				code: 1,
				msg: '用户名或者密码错误'
			});
		}
		res.cookie('userid', doc._id);
		return res.json({
			code: 0,
			data: doc
		});
	});
});

Router.post('/register', (req, res) => {
	console.log(req.body);
	const {
		user,
		pwd,
		type
	} = req.body;
	User.findOne({
		user
	}, (err, doc) => {
		if (doc) {
			return res.json({
				code: 1,
				msg: '用户名重复'
			})
		}

		// 注册成功后不能返回 _id
		const userModel = new User({
			user,
			type,
			pwd: md5Pwd(pwd)
		})
		userModel.save((e, d) => {
			if (e) {
				return res.json({
					code: 1,
					msg: '后台错误'
				});
			}
			const {
				user,
				type,
				_id
			} = d;
			// 保存cookie
			res.cookie('userid', _id);
			return res.json({
				code: 0,
				data: {
					user,
					type,
					_id
				}
			});
		});
	})
});

Router.get('/info', (req, res) => {
	// 获取cookie
	const {
		userid
	} = req.cookies;
	if (!userid) {
		// 校验cookie
		res.json({
			code: 1
		});
	}
	User.findOne({
		_id: userid
	}, _filter, (err, doc) => {
		if (err) {
			return res.json({
				code: 1,
				msg: '后端错误'
			})
		}
		if (doc) {
			return res.json({
				code: 0,
				data: doc
			})
		}
	})
});

function md5Pwd(pwd) {
	const salt = 'jason_is_winner!!!#$#@!@!!!';
	return utils.md5(utils.md5(pwd + salt))

}


module.exports = Router;