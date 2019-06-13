import React, { Component } from 'react';
import './index.css';
import helpers from '../../../helpers';

class ChatForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: ''
        }
    }

	sendMessage = ()=> {
        
        helpers.socketSend({ 
            method: 'addMessage', 
            data: { 
                user: 'xeywar', 
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