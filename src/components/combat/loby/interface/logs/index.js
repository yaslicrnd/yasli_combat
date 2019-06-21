import React, { Component, Fragment } from 'react';
import authHelpers from '../../../../auth/authHelpers';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import './index.css';

class LogsComponent extends Component {

    componentDidUpdate() {
        this.scroll();
    }

    scroll = () => {
        this.refs.scrollbars.scrollToBottom();
    }

    getClassItemLogs(username) {
        let user = authHelpers.getUserInfo();
        let str = 'combat__loby__logs__item';

        if(user.username === username) {
            str += ' combat__loby__logs__item_you';
        } else {
            str += ' combat__loby__logs__item_enemy';
        }

        return str;
    }

    getMessageItemLogs(blocked, damage) {
        if(blocked) {
            return 'уклонился';
        } else {
            return 'получил -'+damage+'hp урона';
        }
    }

    render() {

        let { results, start } = this.props;
        start = new Date(start).toLocaleString().slice(0, -3);

    	return (
            <div className="combat__loby__interface__logs">
                <Scrollbars 
                    className="combat__loby__logs__case"
                    ref="scrollbars"
                    renderView={() => <div className="scrollbar-view"/>}
                    renderTrackVertical={() => <div className="track-vertical"/>}
                    renderThumbVertical={props => <div {...props} className="thumb-vertical"/>}
                >
                    <div className="combat__loby__logs__item">
                        <i></i><span>{start} | Бой начался</span>
                    </div>

                    {results.map((i,n) => {
                        
                        return (
                            <Fragment key={n}>

                                <div className={this.getClassItemLogs(i[0].origin.username)}>
                                    <i></i>
                                    <span>
                                        {n+1} раунд 
                                        | {i[0].origin.username}
                                        {' '+this.getMessageItemLogs(i[0].blocked, i[0].damage)}
                                    </span>
                                </div>

                                <div className={this.getClassItemLogs(i[1].origin.username)}>
                                    <i></i>
                                    <span>
                                        {n+1} раунд 
                                        | {i[1].origin.username} 
                                        {' '+this.getMessageItemLogs(i[1].blocked, i[1].damage)}
                                    </span>
                                </div>

                            </Fragment>
                        )
                    })}
                    
                </Scrollbars>
            </div>
        )

    }

}

const mapStateToProps = state => ({
    results: state.loby.results,
    start: state.loby.start
});

export default connect(mapStateToProps, null)(LogsComponent);