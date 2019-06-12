import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changePlayers } from './lobyActions';
import PlayerComponent from './player';
import InterfaceComponent from './interface';
import config from '../../../config';
import helpers from '../../../helpers';
import authHelpers from '../../../components/auth/authHelpers';
import './index.css';

class LobyComponent extends Component {

    componentDidMount() {

        fetch(config.backend + '/api/whoami?' + helpers.jsonToUrlEncode({ token: authHelpers.getToken() }))
            .then(res => res.json())
            .then(data => {
                if(data.status === 'error') {
                    return;
                }
                
                this.props.changePlayers({ you: data.user, enemy: {health: 30} });
            });
        
    }

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