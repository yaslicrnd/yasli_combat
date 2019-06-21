import React, { Component } from 'react';
import { connect } from 'react-redux';
import helpers from '../../../helpers';
import { updateRefer } from '../chatActions';
import authHelpers from '../../auth/authHelpers';
import './index.css';

class WhoOnline extends Component {

	componentDidMount() {
		helpers.socketSend( { method: 'getOnline' } );
	}

	updateRefer = (e)=> {
		this.props.updateRefer(e.target.innerText);
	}

	exitAuth() {
		authHelpers.removeToken();
		window.location.pathname = '/auth/login';
	}
    
	render() {

		let { users } = this.props;
		
		return (
			<div className="combat__chat__why-online">
				<h3 className="combat__chat__why-online-header">
					<span>Бойцы онлайн</span>
					<i onClick={this.exitAuth} className="combat__chat__why__exit-button"></i>
				</h3>

				<ul className="combat__chat__why-online-list">
					{ users && users.map((users, index) =>(
						<li key={index} className="combat__chat__why-online-username">
							<span 
								onClick={this.updateRefer}
								className="combat__chat__why-online-text"
							>{users.username}</span>
						</li>
					))}
				</ul>        
			</div>
		)
	}

}

const mapDispatchToProps = { updateRefer };
const mapStateToProps = state => ({
    users: state.chat.users,
});

export default connect(mapStateToProps, mapDispatchToProps)(WhoOnline);