import React, { Component } from 'react';
import './index.css'

class ErrorPopUp extends Component {

    render() {
        return (
            <div className="error-popup">
                <div className="error-popup__message">{this.props.message}</div>
                <button className="error-popup__action" onClick={this.redirect}>Ok</button>
            </div>
        )
    }

    redirect = () => {
        window.location.replace('/auth/login');
    }
}

export default ErrorPopUp;