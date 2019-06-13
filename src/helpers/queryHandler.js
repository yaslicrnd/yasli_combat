import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateMessages, updateOnline } from '../components/chat/chatActions';
import authHelpers from '../components/auth/authHelpers';

class QueryHandler extends Component {

    constructor(props) {
        super(props);
        console.log(this.props);

        let user = authHelpers.getUserInfo();

        if(user) {
            this.props.initSocket.then(socket => {

                socket.addEventListener('message', (event) => {
                    let data = JSON.parse(event.data);

                    if(data.method) {
                        switch (data.method) {
                            /* chat */
                            case 'getMessages':
                                this.props.updateMessages(data.messages);
                                break;
                            
                            case 'getOnline':
                                this.props.updateOnline(data.users);
                                break;

                            default: 
                                throw new Error('Error method'); 
                        }
                    }
                });

                socket.addEventListener('close', (event) => {
                    console.log('close');
                });

            });
        }

    }

    render() {
        return (
            <div id="site">
                {this.props.children}
            </div>
        );
    }
    
}

const mapDispatchToProps = { updateMessages, updateOnline };
export default connect(null, mapDispatchToProps)(QueryHandler);