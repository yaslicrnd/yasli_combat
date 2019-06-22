import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateMessages, updateOnline } from '../components/chat/chatActions';
import { changePlayers, changeStatusGame, resetStatusItems, 
    changeResults, changeTurnStatus, setStartBattle } from '../components/combat/loby/lobyActions';
import authHelpers from '../components/auth/authHelpers';
import { statePopup } from '../components/popup/popupActions';

class QueryHandler extends Component {

    constructor(props) {
        super(props);

        let user = authHelpers.getUserInfo();

        if(user && window.location.pathname === '/') {
            this.props.initSocket.then(socket => {

                socket.addEventListener('message', (event) => {
                    let data = JSON.parse(event.data);

                    if(data.method) {
                        switch (data.method) {
                            case 'getMessages':
                                this.props.updateMessages(data.messages);
                                break;
                            
                            case 'getOnline':
                                this.props.updateOnline(data.users);
                                break;

                            case 'getFight':
                                console.log(data.combat);

                                if(!authHelpers.getCombat() || data.combat.id !== authHelpers.getCombat()) {
                                    authHelpers.setCombat(data.combat.id);
                                }

                                this.props.changeResultInfo(
                                    data.combat.results,
                                    { you: data.combat.you, enemy: data.combat.enemy || {health: 30} },
                                    this.getStatus(data.combat.turnStatus, data.combat.status),
                                    data.combat.turnStatus,
                                    data.combat.start
                                );

                                if(data.combat.status === 'finished') {
                                    let message;

                                    if(data.combat.you.health <= 0 && data.combat.enemy.health <= 0) {
                                        message = 'Ничья!';
                                    } else if(data.combat.you.health <= 0) {
                                        message = 'Вы проиграли!';
                                    } else if(data.combat.enemy.health <= 0) {
                                        message = 'Вы выиграли!';
                                    }

                                    this.props.statePopup({ message: message});
                                    authHelpers.removeCombat();
                                }

                                break;

                            default: 
                                throw new Error('Error method'); 
                        }
                    }
                });

                socket.addEventListener('close', (e) => {
                    authHelpers.removeToken();
                    authHelpers.removeCombat();
                    this.props.statePopup({ message: 'Соединение потеряно', clickFunc: this.redirect});
                });

            });
        }

    }

    redirect = () => {
        window.location.replace('/auth/login');
    }

    getStatus = (turnStatus, status) => {
        if(status === 'pending') return 2;
        if(status === 'finished') return 5;
        if(turnStatus) return 3;
        if(!turnStatus) return 4;
    }

    render() {
        return (
            <div id="site">
                {this.props.children}
            </div>
        );
    }
    
}

const mapDispatchToProps = dispatch => ({ 
    statePopup: (data) => {
        dispatch(statePopup(data));
    },
    updateMessages: (messages) => {
        dispatch(updateMessages(messages));
    },
    updateOnline: (users) => {
        dispatch(updateOnline(users));
    },
    changePlayers: (players) => {
        dispatch(changePlayers(players));
    }, 
    changeStatusGame: (status) => {
        dispatch(changeStatusGame(status));
    }, 
    changeResultInfo: (results, players, status, turn_status, start) => {
        dispatch(changeResults(results));
        dispatch(changePlayers(players));
        dispatch(changeStatusGame(status));
        dispatch(changeTurnStatus(turn_status));
        dispatch(setStartBattle(start));
        dispatch(resetStatusItems());
    }
});

export default connect(null, mapDispatchToProps)(QueryHandler);