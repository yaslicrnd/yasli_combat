import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '../authForm/authForm';
import authHelpers from '../authHelpers';
import config from '../../../config';
import helpers from '../../../helpers';

class Reg extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: ''
        };
        
    }

    signIn = (username, password)=> {

        fetch(config.backend + '/api/register', {
            body: helpers.jsonToUrlEncode({username, password}),
            headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
            method: 'POST'
        }).then(res => res.json()).then(data => {
            if(data.status == 'error') {
                this.setState( { message: data.message } );
            } else {
                authHelpers.setToken(data.user.token);
                window.location = window.location;
            }
        });

    }

    render() {
        return (
            <div className="auth-case">
                <h3>Регистрация</h3>
                <AuthForm
                    buttonName={'Регистрация'}
                    buttonClick={this.signIn}
                />
                <Link className="auth__link"  to={'/auth/login'}>Авторизация</Link>
            </div>
        )
    }

}

export default Reg;