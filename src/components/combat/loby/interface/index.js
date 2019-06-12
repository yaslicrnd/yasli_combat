import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogsComponent from './logs/index';
import FightComponent from './fight/index';
import MainButtonComponent from './mainButton/index';
import './index.css';

class InterfaceComponent extends Component {

    getClassInterface = (name, status)=> status >= 3 ? name + ' combat__loby__interface_fight' : name;

    render() {

        let { status } = this.props;

    	return (
            <div className={this.getClassInterface('combat__loby__interface', status)}>
                { status >= 3 ? <FightComponent/> : null }
                <MainButtonComponent/>
                { status >= 3 ? <LogsComponent/> : null }
            </div>
        )

    }

}

const mapStateToProps = state => ({
    status: state.loby.status
});

export default connect(mapStateToProps, null)(InterfaceComponent);