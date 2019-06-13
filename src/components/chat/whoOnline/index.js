import React, { Component } from 'react';
import { connect } from 'react-redux';
import helpers from '../../../helpers';
import './index.css';

class WhoOnline extends Component {

	componentDidMount() {
		helpers.socketSend( { method: 'getOnline' } );
	}
    
	render() {

		let { users } = this.props;
		
		return (
			<div className="combat__chat__why-online">
				<h3 className="combat__chat__why-online-header">Бойцы онлайн</h3>

				<ul className="combat__chat__why-online-list">
					{ users && users.map((users, index) =>(
						<li key={index} className="combat__chat__why-online-username">
							<span className="combat__chat__why-online-text">{users.username}</span>
						</li>
					))}
				</ul>        
			</div>
		)
	}

}

const mapStateToProps = state => ({
    users: state.chat.users,
});

export default connect(mapStateToProps, null)(WhoOnline);