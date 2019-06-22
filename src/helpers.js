import authHelpers from './components/auth/authHelpers';

let user = authHelpers.getUserInfo();
let socket, initSocket;
if (user && window.location.pathname === '/') {
    socket = new WebSocket('ws://ya-combat.tw1.ru/api/ws?token=' + user.token + '&username=' + user.username);
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
            if (index !== 0) acc += '&';
            return acc + item + '=' + params[item];
        }, '');
    }

};

export default helpers;

