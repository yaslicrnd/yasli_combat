import authHelpers from './components/auth/authHelpers';
import createPopUp from './components/errorPopup/createPopup';

let user = authHelpers.getUserInfo();
let socket, initSocket;
if(user) {
    socket = new WebSocket('ws://ya-combat.tw1.ru/ws?token=' + user.token + '&username='+user.username);
    initSocket = new Promise(resolve => {
        socket.addEventListener('open', () => resolve(socket));
    });
}

let helpers = {

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

export default helpers;