import axios from 'axios';
import {
	getRedirectPath
} from './../util';

// 常量
const ERROR_MSG = 'ERROR_MSG';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const LOAD_DATA = 'LOAD_DATA';

const initState = {
	redirectTo: '',
	msg: '',
	user: '',
	type: ''
}

// reducer
export function user(state = initState, action) {
	switch (action.type) {
		case AUTH_SUCCESS:
			return { ...state,
				msg: '',
				redirectTo: getRedirectPath(action.payload),
				...action.payload
			};
		case LOAD_DATA:
			return { ...action,
				...action.payload
			};
		case ERROR_MSG:
			return { ...state,
				msg: action.msg
			};
		default:
			return state;
	}
}

// action 
function authSuccess(data) {
	return {
		type: AUTH_SUCCESS,
		payload: data
	}
}

function errorMsg(msg) {
	return {
		msg,
		type: ERROR_MSG
	};
}


// 页面刷新后 redux重置导致用户登录状态丢失的解决
export function loadData(userinfo) {
	return {
		type: LOAD_DATA,
		payload: userinfo
	};
}

// 个人详细信息提交（boss、genius）
export function update(data) {
	return dispatch => {
		axios.post('/user/update', data)
			.then(res => {
				if (res.status === 200 && res.data.code === 0) {
					dispatch(authSuccess(res.data.data));
				} else {
					dispatch(errorMsg(res.data.msg));
				}
			})
	}
}

// 登陆逻辑
export function login({
	user,
	pwd
}) {
	if (!user || !pwd) {
		return errorMsg('用户密码必须输入');
	}

	return dispatch => {
		axios.post('/user/login', {
				user,
				pwd
			})
			.then(res => {
				if (res.status === 200 && res.data.code === 0) {
					dispatch(authSuccess(res.data.data));
				} else {
					dispatch(errorMsg(res.data.msg));
				}
			})
	}
}

// 注册逻辑
export function regisger({
	user,
	pwd,
	repeatpwd,
	type
}) {
	if (!user || !pwd || !repeatpwd) {
		return errorMsg('用户名密码必须输入');
	}
	if (pwd !== repeatpwd) {
		return errorMsg('密码和确认密码不同');
	}
	return dispatch => {
		axios.post('/user/register', {
				user,
				pwd,
				type
			})
			.then(res => {
				if (res.status === 200 && res.data.code === 0) {
					dispatch(authSuccess({
						user,
						pwd,
						type
					}));
				} else {
					dispatch(errorMsg(res.data.msg));
				}
			})
	}

}