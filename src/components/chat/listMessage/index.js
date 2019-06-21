import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import helpers from '../../../helpers';
import './index.css';
import authHelpers from '../../auth/authHelpers';

class ListMessage extends Component {

    componentDidMount() {
        helpers.socketSend( { method: 'getMessages' } );
    }

    componentDidUpdate() {
        this.scroll();
    }

    scroll = () => {
        this.refs.scrollbars.scrollToBottom();
    }

    getClassListMissage(user, message) {
        let str = 'message-list__message';
        if(message.indexOf(user.username) !== -1) {
            str += ' message-list__message_refer';
        }
        return str;
    }

    render() {
        
        let { messages } = this.props;
        let user = authHelpers.getUserInfo();

        return (
            <div className="combat__chat__message-list">
                <Scrollbars 
                    className="message-list"
                    ref="scrollbars"
                    renderTrackVertical={() => <div className="track-vertical"/>}
                    renderThumbVertical={props => <div {...props} className="thumb-vertical"/>}
                >
                    
                    {messages.map((message) => {
                        let date = new Date(+message.timestamp);
                        let time = ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);

                        return (
                            <li key={message.timestamp} className={this.getClassListMissage(user, message.message)}>
                                {time} [ <span>{message.user}</span> ]: {message.message}
                            </li>
                        )
                    })}

                </Scrollbars>
            </div>
        );

    }

}

const mapStateToProps = state => ({
    messages: state.chat.messages,
});

export default connect(mapStateToProps, null)(ListMessage);