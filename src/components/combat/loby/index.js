import React, { Component } from 'react';
import PlayerComponent from './player';
import InterfaceComponent from './interface';
import './index.css';

class LobyComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            step: 0
        };

    }

    render() {

    	return (
            <div className="combat__loby">
                <PlayerComponent 
                    type={'you'}
                    mixin={'left'}
                    step={this.state.step}
                ></PlayerComponent>
                <InterfaceComponent></InterfaceComponent>
                <PlayerComponent 
                    type={'enemy'}
                    mixin={'right'}
                    step={this.state.step}
                ></PlayerComponent>
            </div>
        )

    }

}

export default LobyComponent;