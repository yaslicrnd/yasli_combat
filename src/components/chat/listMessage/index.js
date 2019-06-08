import React, { Component } from 'react';
import './index.css';
import authHelpers from '../../auth/authHelpers'
import config from '../../../config'

class ListMessage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            messages: []
        }
    }

    componentDidMount() {
        // запрос к серверу, повторяющийся через определённый промежуток времени
        this.getMessages();
        setInterval(() => {
            this.getMessages();
        }, 3000);
    }

    //Функция жизненого цикла, которая выполнится после обновления компонента
    componentDidUpdate() {
        this.scroll();
    }

    //Функция жизненого цикла, реагирующая на обновление компонента, при возврате true, обновляет компонент
    shouldComponentUpdate(nextProps, nextState) {
        return this.state.messages.length !== nextState.messages.length;
    }

    //Функция для получения массива сообщений, используя Api ручку
    getMessages = () => {
        let userToken = authHelpers.getToken(); //Получение пользовательского токена
        if(userToken) {
            fetch(config.backend + '/api/chat?token=' + userToken)
                .then(res => res.json())
                .then(data => {
                    if(data.status === 'error') {
                        return;
                    }

                    this.setState({
                        messages: data.chat

                        //Тест больших сообщений
                        //messages: [{"message":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.","timestamp":1559644898210,"user":{"id":"JtG_KW","username":"xeywar","last_active":1579657926276}}, {"message":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.","timestamp":1559661300,"user":{"id":"JtG_KW","username":"xeywar","last_active":1559655926278}}]
                    })
                })
        }
    };

    //Функция для порокрутки к последнему сообщению
    scroll = () => {
        let messageList = document.querySelector('.message-list');
        if(messageList) {
            messageList.scrollTop = messageList.scrollHeight;
        }
    };

    //Функция окраски ника в случайный цвет
    getRandColor = () => {
        return 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')';
    };

    render() {

        return (
            <div className="combat__chat__message-list">
                <ul className="message-list">
                    {this.state.messages.map((message) => {
                        console.log(message);
                        let date = new Date(message.timestamp);
                        let time = date.getHours() + ':' + date.getMinutes();

                        return (
                            <li key={message.timestamp} className="message-list__message">
                                {time} [ <span style={{color:this.getRandColor()}}>{message.user.username}</span> ]: {message.message}
                            </li>
                        )
                    })}
                </ul>
            </div>
        )

    }

}

export default ListMessage;