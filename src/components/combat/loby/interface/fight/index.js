import React, { Component } from 'react';
import './index.css';

class FightComponent extends Component {

    render() {
        return (
            <div className="combat__loby__interface__head"> 
                        <div className="combat__interface__head__item combat__interface__head__item_left">
                            <div className="combat__interface__head__step"></div>
                            <div className="combat__interface__head__step"></div>
                            <div className="combat__interface__head__step"></div>
                        </div>
                        <div className="combat__interface__head_title">
                            <div className="combat__interface__head_item">username</div>
                            <div className="combat__interface__head_versus">VS</div>
                            <div className="combat__interface__head_item">username</div>
                        </div>
                        <div className="combat__interface__head__item combat__interface__head__item_right">
                            <div className="combat__interface__head__step"></div>
                            <div className="combat__interface__head__step"></div>
                    <div className="combat__interface__head__step"></div>
                </div>
            </div>
        )
    }

}

export default FightComponent;