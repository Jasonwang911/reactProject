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
import imoocForm from './../../component/imooc-form/imooc-form'
import './../../index.css';

@connect(
	state => state.user, {
		regisger
	}
)
@imoocForm
class Register extends React.Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		user: '',
	// 		pwd: '',
	// 		repeatpwd: '',
	// 		type: 'genius' // 或者boss
	// 	}
	// }

	componentDidMount() {
		this.props.handleChange('type', 'genius');
	}
	// 输入框状态的修改
	// handleChange(key, val) {
	// 	this.setState({
	// 		[key]: val
	// 	})
	// }

	handleRegister() {
		// 输入数据的验证
		this.props.regisger(this.props.state);
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
						onChange={v=>this.props.handleChange('user', v)}
						>用户名</InputItem>
						<InputItem
						type="password"
						onChange={v=>this.props.handleChange('pwd', v)}
						>密码</InputItem>
						<InputItem
						type="password"
						onChange={v=>this.props.handleChange('repeatpwd', v)}
						>确认密码</InputItem>
						<RadioItem 
						checked={this.props.state.type === 'genius'}
						onChange={()=>this.props.handleChange('type','genius')}
						>牛人</RadioItem>
						<RadioItem 
						checked={this.props.state.type === 'boss'}
						onChange={()=>this.props.handleChange('type','boss')}
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