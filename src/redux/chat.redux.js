import axios from 'axios'

import io from 'socket.io-client'
// 处理跨域,手动链接 ws
const socket = io('ws://localhost:9093');


// 获取聊天列表
const MSG_LIST = 'MSG_LIST';
// 获取信息
const MSG_RECV = 'MSG_RECV';
// 标识已读
const MSG_READ = 'MSG_READ';

const initStat = {
	chatmsg: [],
	// 未读信息列表
	unread: 0
}

export function chat(state = initStat, action) {
	switch (action.type) {
		case MSG_LIST:
			return { ...state,
				chatmsg: action.payload,
				unread: action.payload.filter(v => !v.read).length
			}
		case MSG_RECV:
			return { ...state,
				chatmsg: [...state.chatmsg, action.payload],
				unread: state.unread + 1
			}
			// case MSG_READ:
		default:
			return state;
	}
}

// action
function msgList(msgs) {
	return {
		type: 'MSG_LIST',
		payload: msgs
	}
}

function msgRecv(msg) {
	return {
		type: MSG_RECV,
		payload: msg
	};
}

// 获取聊天记录
export function getMsgList() {
	return dispatch => {
		axios.get('/user/getmsgList')
			.then(res => {
				if (res.status === 200 && res.data.code === 0) {
					dispatch(msgList(res.data.msgs))
				}
			})
	}
}

// 进入聊天页面后开始接收信息
export function recvMsg() {
	return dispatch => {
		socket.on('recvMsg', (data) => {
			console.log('recvMsg', data);
			dispatch(msgRecv(data));
		})
	}
}

// 新发送聊天
export function sendMsg({
	from,
	to,
	msg
}) {
	return () => {
		console.log('sendMsg', {
			from,
			to,
			msg
		})
		socket.emit('sendMsg', {
			from,
			to,
			msg
		});
	}
}