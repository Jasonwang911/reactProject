import React from 'react'
import {
	connect
} from 'react-redux'
import {
	List,
	Badge
} from 'antd-mobile'

@connect(
	state => state,
	null
)
class Msg extends React.Component {

	// 获取最后一条聊天信息
	getLast(arr) {
		return arr[arr.length - 1];
	}

	render() {
		const Item = List.Item;
		const Brief = Item.Brief;
		// 当前登录用户
		const userid = this.props.user._id;
		// 用户列表
		const userinfo = this.props.chat.users;
		// 按照聊天用户分组，根据chatid
		const msgGroup = {}
		this.props.chat.chatmsg.forEach(v => {
			msgGroup[v.chatid] = msgGroup[v.chatid] || [];
			msgGroup[v.chatid].push(v)
		})
		// 需要对聊天列表进行时间的排序从大到小
		const chatList = Object.values(msgGroup).sort((a, b) => {
			const a_last = this.getLast(a).create_time;
			const b_last = this.getLast(b).create_time;
			return b_last - a_last;
		});

		return (
			<div>
				{ chatList.map( v => {
					const lastItem = this.getLast(v);
					// 聊天记录发送者的id
					const targetId = v[0].from === userid ? v[0].to : v[0].from;
					const unreadNum = v.filter(v => !v.read && v.to===userid).length;
					const name = userinfo[targetId].name ? userinfo[targetId].name : '';
					const avatar = userinfo[targetId].avatar ? userinfo[targetId].avatar : '';
					return (
						<List key={lastItem._id}>
							<Item
								extra={<Badge text={unreadNum}></Badge>}
								thumb={require(`./../img/${avatar}.png`)}
								arrow="horizontal"
								onClick={() => {
									this.props.history.push(`/chat/${targetId}`)
								}}
							>
								{lastItem.content}
								<Brief>{name}</Brief>
							</Item>
						</List>
					)
				})}
			</div>
		)
	}
}

export default Msg;