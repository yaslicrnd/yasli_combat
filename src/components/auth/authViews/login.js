import React, { Component } from 'react';
import { Link } from "react-router-dom";
import AuthForm from '../authForm/authForm';
import authHelpers from '../authHelpers';
import config from '../../../config';
import helpers from '../../../helpers';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: ''
        };

    }

    logIn = (username, password)=> {

        fetch(config.backend + '/api/login', {
            body: helpers.jsonToUrlEncode({username, password}),
            headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
            method: 'POST'
        }).then(res => res.json()).then(data => {
            if(data.status === 'error') {
                this.setState( { message: data.message } );
            } else {
                authHelpers.setToken(data.user.token);
                authHelpers.setUserInfo(data.user);
                window.location = '/';
            }
        });

    }

    render() {
        return (
            <div className="auth-case">
                <h3>Вход в игру</h3>
                <AuthForm
                    buttonName={'Войти'}
                    buttonClick={this.logIn}
                    message={this.state.message}
                />
                <Link className="auth__link"  to={'/auth/reg'}>Регистрация</Link>
            </div>
        )
    }

}

export default Login;