import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import userRouter from './user';
import models from './model';
import path from 'path';
// react ssr
// import React from 'react';
import {
	renderToString
} from 'react-dom/server'
const Chat = models.getModel('chat');


// import React from 'react';
// const express = require('express');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const userRouter = require('./user');
// const models = require('./model');
// const Chat = models.getModel('chat');
// const path = require('path');

const app = express();

// 如果需要socket.io 与 express配合需要引入http模块 使用http把express的服务包一层
const server = require('http').Server(app);
const io = require('socket.io')(server);

// 监听事件
io.on('connection', (socket) => {
	// socket 是当前链接的请求，io则是全局的连接请求
	socket.on('sendMsg', (data) => {
		console.log('服务端接受消息了', data)
		// 发送一次全局的事件，广播给全局
		const {
			from,
			to,
			msg
		} = data;
		// 定义每个聊天唯一的id
		const chatid = [from, to].sort().join('_');
		const createType = {
			chatid,
			from,
			to,
			content: msg,
			create_time: new Date().getTime()
		};
		Chat.create(createType, (err, doc) => {
			if (!err) {
				io.emit('recvMsg', Object.assign({}, doc._doc));
			}
		})
	})
});

app.use(cookieParser());
app.use(bodyParser.json());

app.use('/user', userRouter)
app.use((req, res, next) => {
	if (req.url.startsWith('/user/') || req.url.startsWith('/static')) {
		return next()
	} else {
		console.log('path reslove:' + path.resolve('build/index.html'))
		return res.sendFile(path.resolve('build/index.html'))
	}
})

// express中间件，拦截路由
app.use('/', express.static(path.resolve('build')));

server.listen(9093, () => {
	console.log(`Node app start at prot 9093`);
});