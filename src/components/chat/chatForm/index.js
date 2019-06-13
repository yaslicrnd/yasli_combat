import React, { Component } from 'react';
import './index.css';
import helpers from '../../../helpers';
import authHelpers from '../../auth/authHelpers';

class ChatForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: ''
        }
    }

	sendMessage = ()=> {

        let user = authHelpers.getUserInfo();
        
        helpers.socketSend({ 
            method: 'addMessage', 
            data: { 
                user: user.username, 
                message: this.state.message,
                timestamp: +new Date()
            }
        });

        this.setState({message: ''});

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