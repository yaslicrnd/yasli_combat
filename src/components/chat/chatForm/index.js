import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateRefer } from '../chatActions';
import EmojiField from 'emoji-picker-textfield';
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

    shouldComponentUpdate(nextProps) {
        let nowValue = this._field.getUnicode();

        if(this.props.refer !== nextProps.refer && nextProps.refer) {
            let unicodeValue = this._field.getUnicode().replace(this.props.refer+', ', '');
            this._field.state.value = nextProps.refer + ', ' + unicodeValue;
            this.setState({message: this._field.state.value});
            document.querySelector('.chat__input').focus();
        }

        if(nowValue.length < this.props.refer.length) {
            this.props.updateRefer('');
        }

        return true;
    }

	sendMessage = ()=> {

        if(this.state.message) {

            let user = authHelpers.getUserInfo();
            
            helpers.socketSend({ 
                method: 'addMessage', 
                data: { 
                    user: user.username, 
                    message: this.state.message,
                    timestamp: +new Date()
                }
            });

            this._field.state.value = '';
            this.setState({message: ''});
            this.props.updateRefer('');
        }

    }
    
    handleChange = ()=> {
        let unicodeValue = this._field.getUnicode();
        this._field.state.value = unicodeValue;
        this.setState({message: unicodeValue});
    }

    pressEnter = (e)=> {
        if(e.key === 'Enter') {
            this.sendMessage();
        }
    }

    render() {

    	return (
            <div className="combat__chat__form">
                <div className="combat__chat__form__case">
                    <div className="combat__chat__case">
                        <EmojiField
                            autoClose={true}
                            ref={(_field) => this._field = _field}
                            fieldType="input"
                            className="chat__input" 
                            onChange={this.handleChange} 
                            onKeyPress={this.pressEnter}
                        />
                        <button onClick={this.sendMessage}></button>
                    </div>
                </div>
            </div>
        )

    }
}

const mapDispatchToProps = { updateRefer };
const mapStateToProps = state => ({
    refer: state.chat.refer,
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatForm);