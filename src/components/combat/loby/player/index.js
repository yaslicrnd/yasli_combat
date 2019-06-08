import React, { Component } from 'react';
import './index.css';

class PlayerComponent extends Component {

    // return default class or class + mixin
    getClassWithMixin = (name, mixin)=> mixin ? name + ' ' + name + '_' + mixin : name;

    // return class name main block + his type
    getClassTypePlayer = (type)=> 'combat__loby__player__' + type + ' ' + 'combat__loby__player';

    render() {

        let { mixin, type } = this.props;

    	return (
            <div className={this.getClassTypePlayer(type)}>

                { /* в отдельный комнонент? */ }
                <div className="combat__player__healths">
                    <div className="combat__healths__status"></div>
                    <div className="combat__healths__info">50/100</div>
                </div>

                <div className={this.getClassWithMixin('combat__player__name', mixin)}>username</div>

                { /* в отдельный комнонент? */ }
                <div className="combat__player__ava">
                    <div className="combat__ava__item combat__head"></div>
                    <div className="combat__ava__item combat__body"></div>
                    <div className="combat__ava__item combat__belt"></div>
                    <div className="combat__ava__item combat__feet"></div>
                </div>
                
                <div className={this.getClassWithMixin('combat___player__skills', mixin)}>
                    <div className="combat__skills__line">
                        <span className="combat__skills__line_bold">Сила:</span>
                        <span>25</span>
                    </div>
                    <div className="combat__skills__line">
                        <span className="combat__skills__line_bold">Ловкость:</span>
                        <span>12</span>
                    </div>
                    <div className="combat__skills__line">
                        <span className="combat__skills__line_bold">Мудрость:</span>
                        <span>45</span>
                    </div>
                    <div className="combat__skills__line">
                        <span className="combat__skills__line_bold">Интуиция:</span>
                        <span>12</span>
                    </div>
                    <div className="combat__skills__line">
                        <span className="combat__skills__line_bold">Выносливость:</span>
                        <span>10</span>
                    </div>
                    <div className="combat__skills__line">
                        <span className="combat__skills__line_bold">Интелект:</span>
                        <span>0</span>
                    </div>
                </div>
            </div>
        )

    }

}

export default PlayerComponent;