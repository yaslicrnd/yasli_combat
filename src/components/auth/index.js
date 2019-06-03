import React, { Component } from 'react';

import Login from './authViews/login';
import Reg from './authViews/reg';
import './index.css';

class AuthComponent extends Component {

    render() {
        let { action } = this.props.match.params;

    	return (
            <div className="auth">
                <div className="auth-header"></div>
                { action === 'login' ? <Login {...this.props} /> : <Reg {...this.props} /> }
                <div className="auth-copyright">(c) ЦРНД 2019</div>
            </div>
        )
    }

}

export default AuthComponent;