const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRouter = require('./user');
const models = require('./model');
const Chat = models.getModel('chat');

const app = express();

// 如果需要socket.io 与 express配合需要引入http模块 使用http把express的服务包一层
const server = require('http').Server(app);
const io = require('socket.io')(server);

// 监听事件
io.on('connection', (socket) => {
	// socket 是当前链接的请求，io则是全局的连接请求
	// console.log('user login')
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
			content: msg
		};
		Chat.create(createType, (err, doc) => {
			console.log(doc)
			if (!err) {
				io.emit('recvMsg', Object.assign({}, doc._doc));
			}
		})
	})
});

app.use(cookieParser());
app.use(bodyParser.json());

app.use('/user', userRouter)

app.get('/', (req, res) => {
	res.send(`<h1>hello boss！</h1>`);
});

server.listen(9093, () => {
	console.log(`Node app start at prot 9093`);
});