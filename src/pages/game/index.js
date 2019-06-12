import React, { Component } from 'react';
import LobyComponent from '../../components/combat/loby/index';
import ListMessageComponent from '../../components/chat/listMessage/index';
import ListWhoOnline from '../../components/chat/whoOnline/index';
import ChatForm from '../../components/chat/chatForm/index';

class Game extends Component {

    render() {
        return (
            <div className="combat">
                <LobyComponent></LobyComponent>
                <div className="combat__chat">
                    <div className="combat__chat__messages">
                        <ListMessageComponent></ListMessageComponent>
                        <ListWhoOnline></ListWhoOnline>
                    </div>
                    <ChatForm></ChatForm>
                </div>
            </div>
        )
    }

}

export default Game;