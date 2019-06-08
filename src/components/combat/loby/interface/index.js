import React, { Component } from 'react';
import LogsComponent from './logs/index';
import FightComponent from './fight/index';
import config from '../../../../config';
import helpers from '../../../../helpers';
import authHelpers from '../../../../components/auth/authHelpers';
import './index.css';

class InterfaceComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            status: 1,
            waiting: null,
            dataUsers: []
        };

        this.nameFightButton = ['Готов', 'Ожидание', 'Сбежать'];
        this.funcFightButton = [this.goWait, this.goFight, this.goExit];
    }

    goWait = ()=>{
        this.pollPending();
        setInterval(() => this.pollPending(), 3000);
        this.setState( {status: 2} );
    }

    goFight = ()=> {
        this.setState( {status: 3} );
    }

    goExit = ()=> {
        this.setState( {status:  1} );
    }
    
    pollPending = (url, data)=> {

        fetch(config.backend + '/api/fight', {
            body: helpers.jsonToUrlEncode({
                token: authHelpers.getToken()
            }),
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
                method: 'POST'
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
        });

    }

    getNameFightButton = (status)=> this.nameFightButton[status-1];
    getFuncFightButton = (status)=> this.funcFightButton[status-1];

    render() {

    	return (
            <div className="combat__loby__interface">

                { this.status == 3 ? <FightComponent/> : '' }

                <div 
                    className="combat__loby__interface__step-action"
                    onClick={this.getFuncFightButton(this.state.status)}
                >{this.getNameFightButton(this.state.status)}</div>

                {  this.status == 3 ? <LogsComponent/> : '' }
                
            </div>
        )

    }

}

export default InterfaceComponent;