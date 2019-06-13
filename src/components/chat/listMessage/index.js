import React, { Component } from 'react';
import { connect } from 'react-redux';
import helpers from '../../../helpers';
import './index.css';

class ListMessage extends Component {

    componentDidMount() {
        helpers.socketSend( { method: 'getMessages' } );
    }

    componentDidUpdate() {
        this.scroll();
    }

    scroll = () => {
        let messageList = document.querySelector('.message-list');
        if(messageList) {
            messageList.scrollTop = messageList.scrollHeight;
        }
    }

    render() {
        
        let { messages } = this.props;

        return (
            <div className="combat__chat__message-list">
                <ul className="message-list">
                    {messages.map((message) => {
                        let date = new Date(+message.timestamp);
                        let time = ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);

                        return (
                            <li key={message.timestamp} className="message-list__message">
                                {time} [ <span>{message.user}</span> ]: {message.message}
                            </li>
                        )
                    })}
                </ul>
            </div>
        );

    }

}

const mapStateToProps = state => ({
    messages: state.chat.messages,
});

export default connect(mapStateToProps, null)(ListMessage);