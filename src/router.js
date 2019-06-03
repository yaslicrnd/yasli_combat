import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

import Game from './pages/game/index';
import Auth from './pages/auth/index';
import Error404 from './pages/eror404/index';
import authHelpers from './components/auth/authHelpers';

function PrivateRoute(props) {
    return authHelpers.getToken() ?
        <Route {...props} /> :
        <Redirect to={{
            pathname: '/auth/login',
            state: {from: props.location}
        }}/>
}

function PublicRoute(props) {
    return authHelpers.getToken() ?
        <Redirect to={{
            pathname: '/',
            state: {from: props.location}
        }}/> :
        <Route {...props} />
}

class Main extends Component {

    render() {
        return (
            <main>
                <Switch>
                    <PrivateRoute path="/" exact component={Game} />
                    <PublicRoute path="/auth/:action" exact component={Auth} />
                    <PrivateRoute component={Error404} />
                </Switch>
            </main>
        );
    }

}

export default Main;