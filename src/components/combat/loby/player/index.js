import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeStatusItem } from '../lobyActions';
import './index.css';

class PlayerComponent extends Component {

    // making classes
    getClassWithMixin = (name, mixin)=> mixin ? name + ' ' + name + '_' + mixin : name;
    getPercentHealth = (health)=> {
        if(!health) return 0;
        
        let result = health / 30 * 100 || 100;
        if(result >= 0) {
            return result;
        } else {
            return 0;
        }
    }

    getClassTypePlayer = (type, status)=> {
        let str = 'combat__loby__player__' + type + ' combat__loby__player';
        if(status < 3) str += ' combat__loby__player_disable';
        return str;
    }

    getNamePlayer = (type, username)=> {
        if(type === 'enemy' && !username) return 'Возможный противник';
        return username;
    }

    getClassItemAva = (item)=> {
        let { type, items } = this.props;
        if(items[type][item]) {
            return 'combat__ava__item_active combat__ava__item combat__' + item;
        } else {
            return 'combat__ava__item combat__' + item;
        }
    }

    render() {

        let { type, players, status, changeStatusItem } = this.props;

        console.log(players);

    	return (
            <div className={this.getClassTypePlayer(type, status)}>

                <div className="combat__player__healths">
                    <div 
                        className="combat__healths__status" 
                        style={ {width: this.getPercentHealth(players[type].health).toFixed(0) + '%'} }
                    ></div>
                    <div className="combat__healths__info">
                        {this.getPercentHealth(players[type].health).toFixed(0)}/100%
                    </div>
                </div>

                <div className={this.getClassWithMixin('combat__player__name', type)}>
                    {this.getNamePlayer(type, players[type].username)}
                </div>

                <div className="combat__player__ava">
                    <div 
                        onClick={status === 3 ? changeStatusItem.bind(this, type) : null} 
                        data-item="head"
                        className={this.getClassItemAva('head')}
                    ></div>
                    <div 
                        onClick={status === 3 ? changeStatusItem.bind(this, type) : null} 
                        data-item="body"
                        className={this.getClassItemAva('body')}
                    ></div>
                    <div 
                        onClick={status === 3 ? changeStatusItem.bind(this, type) : null} 
                        data-item="belt"
                        className={this.getClassItemAva('belt')}
                    ></div>
                    <div 
                        onClick={status === 3 ? changeStatusItem.bind(this, type) : null} 
                        data-item="feet"
                        className={this.getClassItemAva('feet')}
                    ></div>
                </div>
                
            </div>
        )

    }

}

const mapDispatchToProps = { changeStatusItem };
const mapStateToProps = state => ({
    status: state.loby.status,
    items: state.loby.items,
    players: state.loby.players
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerComponent);