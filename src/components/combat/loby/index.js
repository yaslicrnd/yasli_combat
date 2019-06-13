import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changePlayers } from './lobyActions';
import PlayerComponent from './player';
import InterfaceComponent from './interface';
import './index.css';

class LobyComponent extends Component {

    render() {

    	return (
            <div className="combat__loby">
                <PlayerComponent type={'you'} mixin={'left'}></PlayerComponent>
                <InterfaceComponent></InterfaceComponent>
                <PlayerComponent type={'enemy'} mixin={'right'}></PlayerComponent>
            </div>
        )

    }

}

const mapDispatchToProps = { changePlayers };
export default connect(null, mapDispatchToProps)(LobyComponent);