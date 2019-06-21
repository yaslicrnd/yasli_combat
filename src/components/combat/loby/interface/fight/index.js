import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.css';

class FightComponent extends Component {

    render() {
        
        let { players } = this.props;

        return (
            <div className="combat__loby__interface__head"> 
                <div className="combat__interface__head_title">
                    <div className="combat__interface__head_item">{ players.you.username }</div>
                    <div className="combat__interface__head_versus">VS</div>
                    <div className="combat__interface__head_item">{ players.enemy.username }</div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    players: state.loby.players
});

export default connect(mapStateToProps, null)(FightComponent);