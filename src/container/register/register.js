import React from 'react'
import Logo from './../../component/logo/logo'
import {
	Redirect
} from 'react-router-dom'
import {
	List,
	InputItem,
	WingBlank,
	WhiteSpace,
	Button,
	Radio
} from 'antd-mobile'
import {
	connect
} from 'react-redux'
import {
	regisger
} from './../../redux/user.redux'
import './../../index.css';

@connect(
	state => state.user, {
		regisger
	}
)
class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: '',
			pwd: '',
			repeatpwd: '',
			type: 'genius' // 或者boss
		}
	}
	// 输入框状态的修改
	handleChange(key, val) {
		this.setState({
			[key]: val
		})
	}

	handleRegister() {
		// 输入数据的验证
		this.props.regisger(this.state);
	}

	render() {
		const RadioItem = Radio.RadioItem;
		return (
			<div>
				{this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
				<Logo></Logo>
				{this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
				<WingBlank>
					<List>
						<InputItem
						onChange={v=>this.handleChange('user', v)}
						>用户名</InputItem>
						<InputItem
						type="password"
						onChange={v=>this.handleChange('pwd', v)}
						>密码</InputItem>
						<InputItem
						type="password"
						onChange={v=>this.handleChange('repeatpwd', v)}
						>确认密码</InputItem>
						<RadioItem 
						checked={this.state.type === 'genius'}
						onChange={()=>this.handleChange('type','genius')}
						>牛人</RadioItem>
						<RadioItem 
						checked={this.state.type === 'boss'}
						onChange={()=>this.handleChange('type','boss')}
						>BOSS</RadioItem>
					</List>
					<WhiteSpace size="xl" />
					<Button type="primary" onClick={this.handleRegister.bind(this)}>注册</Button>
				</WingBlank>
			</div>
		)
	}
}

export default Register;