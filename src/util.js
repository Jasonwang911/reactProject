//工具类函数

// 根据用户信息，返回跳转地址
export function getRedirectPath({
	type,
	avatar
}) {
	//身份 user.type /boss  /genius
	//信息是否完整 user.avatar  /bossinfo   /geniusinfo
	let url = (type === 'boss') ? '/boss' : '/genius';

	if (!avatar) {
		// 信息不完善
		url += 'info';
	}

	return url;
}

// 获取chatid 用来过滤聊天信息
export function getChatId(userId, targetId) {
	return [userId, targetId].sort().join('_');
}