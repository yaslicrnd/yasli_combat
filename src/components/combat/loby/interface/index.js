import React, { Component } from 'react';
import LogsComponent from './logs/index';
import './index.css';

class InterfaceComponent extends Component {

    render() {

    	return (
            <div className="combat__loby__interface">

                <div className="combat__loby__interface__head">
                    { /* 
                        Должно быть либо:
                        Привествие
                        Ожидание боя
                        Интерфейс боя
                        В зависимости от какого-то state
                    */ }

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

                <div className="combat__loby__interface__step-action">Готов</div>

                <LogsComponent/>
                
            </div>
        )

    }

}

export default InterfaceComponent;