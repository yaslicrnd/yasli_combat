import React, { Component } from 'react';
import AuthComponent from '../../components/auth/index';

class Auth extends Component {

    render() {
        return <AuthComponent {...this.props}/>;
    }

}

export default Auth;