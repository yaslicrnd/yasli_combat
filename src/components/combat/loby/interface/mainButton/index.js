import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changePlayers, changeStatusGame, resetStatusItems, 
    changeResults, changeTurnStatus } from '../../lobyActions';
import authHelpers from '../../../../auth/authHelpers';
import config from '../../../../../config';
import helpers from '../../../../../helpers';

class MainButtonComponent extends Component {

    constructor(props) {
        super(props);
        
        this.nameFightButton = ['Let\'s Go', 'Ожидание', 'Готов', 'Ожидание', 'Окей'];
        this.funcFightButton = [this.goWait, null, this.goTurn, null, this.goReset];
        this.pollFightCounter = null;
        this.combat = authHelpers.getCombat() || null;
    }

    // make class button
    getClassButton = (name, status)=> status >= 3 ? name + ' combat__loby__interface__step_fight' : name;
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
    getStatus = (turn_status, status) => {
        if(turn_status === undefined && status === 'pending') return 2;
        if(turn_status === undefined && status === 'finished') return 5;
        if(turn_status) return 3;
        if(!turn_status) return 4;
    }

    // polling
    goWait = ()=> {

        if(!this.combat) {
            fetch(config.backend + '/api/fight', {
                body: helpers.jsonToUrlEncode({token: authHelpers.getToken()}),
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
                method: 'POST'
            })
            .then(res => res.json())
            .then(data => {
                authHelpers.setCombat(data.combat.id);
                this.startWaiting();
            });
        } else {
            this.startWaiting();
        }

    }

    startWaiting = ()=> {
        this.props.changeStatusGame(2);
        this.pollFight();
        this.pollFightCounter = setInterval(this.pollFight.bind(this), 3000);
    }

    pollFight = ()=> {

        let body = helpers.jsonToUrlEncode({ 
            token: authHelpers.getToken(), 
            combat_id: authHelpers.getCombat() 
        });

        fetch(config.backend + '/api/status?' + body)
            .then(res => res.json())
            .then(data => {
                console.log(data.combat);

                let checkTurnStatus = this.props.turn_status !== data.combat.turn_status;
                let checkResults = this.props.results.length !== data.combat.results.length;

                if(checkTurnStatus || checkResults) {
                    this.props.changeResultInfo(
                        data.combat.results, 
                        { you: data.combat.you, enemy: data.combat.enemy || {health: 30} },
                        this.getStatus(data.combat.turn_status, data.combat.status),
                        data.combat.turn_status
                    );
                }

                if(data.combat.status === 'finished') {
                    clearInterval(this.pollFightCounter);
                    // showPopup win or lose
                }

            });

    }

    goTurn = ()=> {
        if(this.props.items.you.size === 2 && this.props.items.enemy.size === 1) {

            fetch(config.backend + '/api/turn', {
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
                method: 'POST',
                body: helpers.jsonToUrlEncode({ 
                    token: authHelpers.getToken(), 
                    combat_id: authHelpers.getCombat(),
                    turn: JSON.stringify(this.getTurnData(this.props.items))
                })
            });

        } else {
            // showError

        }
    }

    goReset = ()=> {
        this.combat = null;
        authHelpers.removeCombat();
        this.props.changeResultInfo([], { you: {health: 30}, enemy: {health: 30} }, 1, false);
    }

    render() {
        let { status } = this.props;
        return (
            <div 
                className={this.getClassButton('combat__loby__interface__step-action', status)}
                onClick={this.funcFightButton[status-1]}
            >{this.nameFightButton[status-1]}</div>
        )
    }

}

const mapDispatchToProps = dispatch => ({ 
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
    results: state.loby.results
});

export default connect(mapStateToProps, mapDispatchToProps)(MainButtonComponent);