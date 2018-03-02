import React from 'react'
import {
	Redirect
} from 'react-router-dom'
import Logo from './../../component/logo/logo'
import {
	List,
	InputItem,
	WingBlank,
	WhiteSpace,
	Button
} from 'antd-mobile'
import {
	connect
} from 'react-redux'
import {
	login
} from './../../redux/user.redux'

@connect(
	state => state.user, {
		login
	}
)
class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: '',
			pwd: ''
		};
		this.register = this.register.bind(this);
	}

	register() {
		this.props.history.push('/register');
	}
	// 输入框状态的修改
	handleChange(key, val) {
		this.setState({
			[key]: val
		})
	}

	handleLogin() {
		this.props.login(this.state);
	}

	render() {
		return (
			<div>
				{this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
				<Logo></Logo>
				<WingBlank>
					{this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
					<List>
						<InputItem
						onChange={v=>this.handleChange('user', v)}
						>用户</InputItem>
						<InputItem
						type="password"
						onChange={v=>this.handleChange('pwd', v)}
						>密码</InputItem>
					</List>
					<WhiteSpace />
					<Button 
					onClick={this.handleLogin.bind(this)}
					type="primary"
					>登陆</Button>
					<WhiteSpace />
					<Button onClick={this.register} type="primary">注册</Button>
				</WingBlank>
			</div>
		)
	}
}

export default Login;