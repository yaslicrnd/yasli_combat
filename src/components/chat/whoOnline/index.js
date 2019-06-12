import React, { Component } from 'react';
import './index.css';

class WhoOnline extends Component {
	constructor(props) {
    	super(props);
		
		this.state = {
      		online: []
    	};
	}

	componentDidMount() {
		this.getOnline();
		setInterval(() => this.getOnline(), 3000);
	}
	  
  	getOnline = ()=> {

    	fetch('http://ya-combat.tw1.ru/api/online')
    	.then(res => res.json())
    	.then(data => {
       		this.setState( { online:data } );
		});

	}
    
	render() {
		const { online } = this.state;

		return (
			<div className="combat__chat__why-online">
				<h3 className="combat__chat__why-online-header">Бойцы онлайн</h3>

				<ul className="combat__chat__why-online-list">
					{ online.users && online.users.map(users =>(
						<li key={users.id} className="combat__chat__why-online-username">
							<span className="combat__chat__why-online-text">{users.username}</span>
						</li>
					))}
				</ul>        
			</div>
		)
	}

}

export default WhoOnline;