import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateMessages } from '../components/chat/chatActions';

class QueryHandler extends Component {

    constructor(props) {
        super(props);
        console.log(this.props);

        this.props.initSocket.then(socket => {

            socket.addEventListener('message', (event) => {
                let data = JSON.parse(event.data);

                if(data.method) {
                    switch (data.method) {
                        case 'getMessages':
                            this.props.updateMessages(data.messages);
                            break;
                
                        default: 
                            throw new Error('Error method'); 
                    }
                }
            });

        });

    }

    render() {
        return (
            <div id="site">
                {this.props.children}
            </div>
        );
    }
    
}

const mapDispatchToProps = { updateMessages };
export default connect(null, mapDispatchToProps)(QueryHandler);