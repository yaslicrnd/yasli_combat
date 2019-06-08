import React, { Component } from 'react';
import './index.css';
import authHelpers from '../../auth/authHelpers'
import config from '../../../config'

class ChatForm extends Component {

	 constructor(props) {
        super(props);

        this.state = {
            message: ''
        }
    }

	sendMessage = () => {
		console.log(this.state.message);

		 let userToken = authHelpers.getToken(); //Получение пользовательского токена
        if(userToken) {
            fetch(config.backend + '/api/chat',{
            	method: 'POST',
            	  headers: {
				      'Accept': 'application/json',
				      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				    },
            	body: JSON.stringify({
            		message: this.state.message,
            		token: userToken
            	})
            })
                .then(res => res.json())
                .then(data => {
                    if(data.status === 'error') {
                        console.error(data);
                        return;
                    }

                    this.setState({
                        message: ''
					 })
                })
        }
	}
	 handleChange = (event) => {
	    this.setState({message: event.target.value});
	  }
    render() {

    	return (
            <div className="combat__chat__form">
                    <input className="chat__input" value={this.state.message} onChange={this.handleChange} />
                    <button onClick={this.sendMessage}>
                    Отправить
                    </button>
          
            </div>
        )

    }

}

export default ChatForm;