import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changePlayers, changeStatusGame, resetStatusItems, 
    changeResults, changeTurnStatus } from '../../lobyActions';
import { statePopup } from '../../../../popup/popupActions';
import authHelpers from '../../../../auth/authHelpers';
import helpers from '../../../../../helpers';

class MainButtonComponent extends Component {

    constructor(props) {
        super(props);
        
        this.nameFightButton = ['Let\'s Go', this.getPreloader(), 'Готов', 'Ожидание', 'Окей'];
        this.funcFightButton = [this.goWait, null, this.goTurn, null, this.goReset];
    }

    // make class button
    getClassButton = (name, status)=> {
        let str = name;
        if(status >= 3) {
            str += ' combat__loby__interface__step_fight';
        }
        if(status === 2) {
            str += ' combat__loby__interface__step_pending';
        }
        return str;
    }
    getTurnData = (items) => {
        let { you, enemy } = items;

        let blocks = Object.keys(you).reduce((finds, item, index) => {
            if(item !== 'size' && you[item]) finds.push(index);
            return finds;
        }, []);

        let hit = Object.keys(enemy).reduce((find, item, index) => {
            return item !== 'size' && enemy[item] ? index : find;
        }, 0);

        return { blocks, hit };
    }
    getPreloader() {
        return (
            <div className="radar"></div>
        );
    }

    goWait = ()=> {

        let user = authHelpers.getUserInfo();
        
        helpers.socketSend({
            method: 'getFight',
            data: {
                user_id: user.user_id
            }
        });

        this.props.changeStatusGame(2);

    }

    goTurn = ()=> {

        if(this.props.items.you.size === 2 && this.props.items.enemy.size === 1) {

            let user = authHelpers.getUserInfo();
            
            helpers.socketSend({
                method: 'setTurn',
                data: {
                    player: user.user_id, 
                    combat_id: authHelpers.getCombat(),
                    turn: this.getTurnData(this.props.items)
                }
            });

        } else {
            this.props.statePopup({ message: 'Защитите 2 части тела, и атакуйте 1 противника!'});
        }

    }

    goReset = ()=> {
        this.props.changeResultInfo([], { you: {health: 30}, enemy: {health: 30} }, 1, false);
    }

    render() {
        let { status } = this.props;
        return (
            <div 
                className={this.getClassButton('combat__loby__interface__step-action', status)}
                onClick={this.funcFightButton[status-1]}
            ><span>{this.nameFightButton[status-1]}</span></div>
        )
    }

}

const mapDispatchToProps = dispatch => ({ 
    statePopup: (data) => {
        dispatch(statePopup(data));
    },
    changePlayers: (players) => {
        dispatch(changePlayers(players));
    }, 
    changeStatusGame: (status) => {
        dispatch(changeStatusGame(status));
    }, 
    changeResultInfo: (results, players, status, turn_status) => {
        dispatch(changeResults(results));
        dispatch(changePlayers(players));
        dispatch(changeStatusGame(status));
        dispatch(changeTurnStatus(turn_status));
        dispatch(resetStatusItems());
    }
});
const mapStateToProps = state => ({
    status: state.loby.status,
    items: state.loby.items,
    turn_status: state.loby.turn_status,
    results: state.loby.results,
    players: state.loby.players
});

export default connect(mapStateToProps, mapDispatchToProps)(MainButtonComponent);