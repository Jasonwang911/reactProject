import React from 'react'
import {
	Card,
	WhiteSpace,
	WingBlank
} from 'antd-mobile'
import PropTypes from 'prop-types'


class UserCard extends React.Component {
	static propTypes = {
		userlist: PropTypes.array.isRequired
	}

	render() {
		return (
			<WingBlank>
			<WhiteSpace />
				{this.props.userlist.map(v=>(
					v.avatar ? (
					<Card key={v._id}>
						<Card.Header
						title={v.user}
						thumb={require(`./../img/${v.avatar}.png`)}
						extra={<span>{v.title}</span>}
						></Card.Header>
						<Card.Body>
							{/* 公司名称 Boss独有 */}
							{v.type === 'boss' 
								? 
								<div>公司名称：{v.company}</div>
								: 
								null
							}
							{v.desc.split('\n').map(d=>(<div key={d}>{d}</div>))}
							{/* 职位薪资 boss独有 */}
							{v.type === 'boss' 
								? 
								<div>岗位薪资：{v.money}</div>
								: 
								null
							}
						</Card.Body>
					</Card>)
					: null
				))}
			</WingBlank>
		)
	}
}

export default UserCard;