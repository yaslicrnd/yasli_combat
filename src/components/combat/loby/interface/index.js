import React, { Component } from 'react';
import LogsComponent from './logs/index';
import FightComponent from './fight/index';
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
        // polling
        console.log('polling');
        this.setState( {status: 2} );
    }

    goFight = ()=> {
        // polling
        this.setState( {status: 3} );
    }

    goExit = ()=> {
        this.setState( {status:  1} );
    }

    polling(url, data) {
        
    }

    getNameFightButton = (status)=> {
        console.log(this.nameFightButton[status-1]);
        return this.nameFightButton[status-1];
    }
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