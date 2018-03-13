import axios from 'axios'

import io from 'socket.io-client'
// 处理跨域,手动链接 ws
const socket = io('ws://192.168.100.189:9093');


// 获取聊天列表
const MSG_LIST = 'MSG_LIST';
// 获取信息
const MSG_RECV = 'MSG_RECV';
// 标识已读
const MSG_READ = 'MSG_READ';

const initStat = {
	chatmsg: [],
	users: {},
	// 未读信息列表
	unread: 0
}

export function chat(state = initStat, action) {
	switch (action.type) {
		case MSG_LIST:
			return { ...state,
				chatmsg: action.payload.msgs,
				users: action.payload.users,
				unread: action.payload.msgs.filter(v => !v.read && v.to === action.payload.userid).length
			}
		case MSG_RECV:
			const n = action.payload.to === action.payload.userid ? 1 : 0;
			console.log(state.unread, n)
			return { ...state,
				chatmsg: [...state.chatmsg, action.payload.msg],
				unread: state.unread + n
			}
		case MSG_READ:
			const {
				from,
				num
			} = action.payload
			return { ...state,
				chatmsg: state.chatmsg.map(v => ({
					...v,
					read: from === v.from ? true : v.read
				})),
				unread: state.unread - num <= 0 ? 0 : state.unread - num
			}
		default:
			return state;
	}
}

// action
function msgList(msgs, users, userid) {
	return {
		type: 'MSG_LIST',
		payload: {
			msgs,
			users,
			userid
		}
	}
}

function msgRecv(msg, userid) {
	return {
		type: MSG_RECV,
		payload: {
			msg,
			userid
		}
	};
}

function msgRead({
	from,
	userid,
	num
}) {
	return {
		type: MSG_READ,
		payload: {
			from,
			userid,
			num
		}
	};
}

// 标记已读信息
export function readMsg(from) {
	return async (dispatch, getState) => {
		const res = await axios.post('/user/readmsg', {
			from
		})
		const userid = getState().user._id;
		if (res.status === 200 && res.data.code === 0) {
			dispatch(msgRead({
				userid,
				from,
				num: res.data.num
			}))
		}
	}
	// return (dispatch, getState) => {
	// 	axios.post('/user/readmsg', {
	// 			from
	// 		})
	// 		.then(res => {
	// 			const userid = getState().user._id;
	// 			if (res.status === 200 && res.data.code === 0) {
	// 				dispatch(msgRead({
	// 					userid,
	// 					from,
	// 					num: res.data.num
	// 				}))
	// 			}
	// 		})
	// }
}

// 获取聊天记录
export function getMsgList() {
	return (dispatch, getState) => {
		axios.get('/user/getmsgList')
			.then(res => {
				if (res.status === 200 && res.data.code === 0) {
					// 当前登录用户的id
					const userid = getState().user._id;
					dispatch(msgList(res.data.msgs, res.data.users, userid))
				}
			})
	}
}

// 进入聊天页面后开始接收信息
export function recvMsg() {
	return (dispatch, getState) => {
		socket.on('recvMsg', (data) => {
			// 当前登录用户的id
			const userid = getState().user._id;
			dispatch(msgRecv(data, userid));
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
		socket.emit('sendMsg', {
			from,
			to,
			msg
		});
	}
}