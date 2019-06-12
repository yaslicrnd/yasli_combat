import authHelpers from './components/auth/authHelpers'
import createPopUp from './components/errorPopup/createPopup'

export default {

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