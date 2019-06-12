import React, { Component } from 'react';
import './index.css';
import authHelpers from '../../auth/authHelpers'
import config from '../../../config'
import helpers from '../../../helpers';

class ChatForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: ''
        }
    }

	sendMessage = ()=> {

        let userToken = authHelpers.getToken();

        if(userToken) {

            fetch(config.backend + '/api/chat', {
            	method: 'POST',
            	headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            	body: helpers.jsonToUrlEncode({message: this.state.message, token: userToken})
            })
            .then(res => res.json())
            .then(data => {
                if(data.status === 'error') return;
                this.setState( { message: '' } );
            });

        }
    }
    
    handleChange = (event)=> {
        this.setState({message: event.target.value});
    }

    render() {

    	return (
            <div className="combat__chat__form">
                <input className="chat__input" value={this.state.message} onChange={this.handleChange} />
                <button onClick={this.sendMessage}>Отправить</button>
            </div>
        )

    }
}

export default ChatForm;