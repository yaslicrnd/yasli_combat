import authHelpers from './components/auth/authHelpers';
import createPopUp from './components/errorPopup/createPopup';

let socket = new WebSocket('ws://ya-combat.tw1.ru/ws/');
let initSocket = new Promise(resolve => {
    socket.addEventListener('open', () => resolve(socket));
});

export default {

    getSocket() {
        return initSocket;
    },

    socketSend(data) {
        initSocket.then(socket => {
            socket.send(JSON.stringify(data));
        });
    },

    jsonToUrlEncode(params) {
        return Object.keys(params).reduce((acc, item, index) => {
            if(index !== 0) acc += '&';
            return acc + item + '=' + params[item];
        }, '');
    },

    async ajax(url,body) {
        return await fetch(url, body)
            .then(res => res.json())
            .then(data => {
                if (data.status === 'error') {
                    authHelpers.removeToken(); //Удаление текущего токена
                    createPopUp(data.message) //TODO как выводить ошибку
                }
                return new Promise((resolve, reject) => {
                    resolve(data);
                });
            });
    }

};