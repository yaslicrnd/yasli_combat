import React, { Component } from 'react';

class authForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            login: '',
            password: '',
            message: ''
        };

    }

    //  writing text - change state input
    updateInput = (e)=> this.setState( {[e.target.name]: e.target.value} );

    // check error and give class
    getClassInput = (error) => error ? 'auth__input auth__input_error' : 'auth__input';
    getClassMessage = (message) => message ? 'auth__message auth__message_active' : 'auth__message';

    checkFields = ()=> {
        if(!this.state.login || !this.state.password) {
            this.setState( { message: 'Заполните все поля!' } );
            return;
        }

        this.props.buttonClick(this.state.login, this.state.password)
    }

    render() {
        let { buttonName, message } = this.props;

        return (
            <form className="auth__form">
                <div className={this.getClassMessage(this.state.message || message)}>{this.state.message || message}</div>
                <label className="auth__label">
                    <input 
                        className={this.getClassInput(this.state.message && !this.state.login)}  
                        placeholder="Логин"
                        name="login"
                        type="text"
                        value={this.state.login}
                        onChange={this.updateInput}
                    />
                </label>
                <label className="auth__label">
                    <input 
                        className={this.getClassInput(this.state.message && !this.state.password)}  
                        placeholder="Пароль"
                        name="password"
                        type="password" 
                        //autoComplete="new-password"
                        value={this.state.password}
                        onChange={this.updateInput}
                    />
                </label>
                <label className="auth__label">
                    <input 
                        className="auth__input auth__input_button" 
                        value={buttonName}
                        onClick={this.checkFields}
                        type="button" 
                    />
                </label>
            </form>
        )
    }

}

export default authForm;