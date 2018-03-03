import React from 'react'
import {
	connect
} from 'react-redux'
import {
	Result,
	WhiteSpace,
	List,
	Button,
	WingBlank,
	Modal
} from 'antd-mobile'
import browserCookie from 'browser-cookies'

@connect(
	state => state.user,
	null
)
class User extends React.Component {
	constructor(props) {
		super(props);
		this.logout = this.logout.bind(this)
	}

	logout() {
		// browserCookie.erase('userid');
		const alert = Modal.alert;

		alert('是否确定注销登录', '', [{
			text: '取消',
			onPress: () => console.log('cancel')
		}, {
			text: '确定',
			onPress: () => {
				browserCookie.erase('userid');
				window.location.href = window.location.href;
			}
		}, ])
	}

	render() {
		const props = this.props;
		return props.user ? (
				<div>
				<Result
					img = {
						<img style={{width:50}} src={require(`../img/${props.avatar}.png`)} alt="" />
					}
    			title={props.user}
    			message={props.type === 'boss' ? props.company : null}
  			></Result>
  			<List renderHeader={() => '简介'}>
  				<List.Item multipleLine>
  					{props.type === 'boss' ?'招聘岗位：': '应聘岗位'}{props.title}
  					{
  						this.props.desc.split('\n').map(v=> (
  								<List.Item.Brief key={v}>{v}</List.Item.Brief>
  							))
  					}
  					{props.money ? <List.Item.Brief>薪资：{props.money}</List.Item.Brief>:null}
  				</List.Item>
  			</List>
  			<WhiteSpace />
  			<WingBlank>
  				<Button type="primary" onClick={this.logout.bind(this)}>退出登录</Button>
  			</WingBlank>
			</div>
			) :
			null
	}
}

export default User;