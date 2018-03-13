import React from 'react'
import {
	Route
} from 'react-router-dom'
import './../../index.css'
import {
	NavBar
} from 'antd-mobile'
import {
	connect
} from 'react-redux'
import {
	getMsgList,
	recvMsg
} from './../../redux/chat.redux'
import NavLinkBar from './../navlink/navlink'
import Boss from './../../component/boss/boss'
import Genius from './../../component/genius/genius'
import User from './../../component/user/user'
import Msg from './../../component/msg/msg'
import QueueAnim from 'rc-queue-anim'


@connect(
	state => state, {
		getMsgList,
		recvMsg
	}
)
class DashBoard extends React.Component {
	componentDidMount() {
		if (!this.props.chat.chatmsg.length) {
			this.props.getMsgList();
			this.props.recvMsg();
		}
	}

	render() {
		const {
			pathname
		} = this.props.location;
		const user = this.props.user;
		const navList = [{
			path: '/boss',
			text: '牛人',
			icon: 'boss',
			title: '牛人列表',
			component: Boss,
			hide: user.type === 'genius'
		}, {
			path: '/genius',
			text: 'BOSS',
			icon: 'job',
			title: 'BOSS列表',
			component: Genius,
			hide: user.type === 'boss'
		}, {
			path: '/msg',
			text: '消息',
			icon: 'msg',
			title: '消息列表',
			component: Msg
		}, {
			path: '/me',
			text: '我',
			icon: 'user',
			title: '个人中心',
			component: User
		}]

		const page = navList.find(v => v.path === pathname)

		return (
			<div>
				<NavBar className="fixd-header" mode="dark">
					{navList.find(v => v.path === pathname).title}
				</NavBar>
				<div style={{position:'relative',zIndex:10}}>
					<QueueAnim type="scaleX" duration={800}>
						<Route path={page.path} component={page.component}
							key={page.path}
						 >
						</Route>
					</QueueAnim>
				</div>
				<NavLinkBar data={navList}></NavLinkBar>
			</div>
		)
	}
}

export default DashBoard;