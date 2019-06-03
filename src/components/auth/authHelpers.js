let token;

export default {

    getToken() {
        return token || localStorage.getItem('token');
    },

    setToken(token) {
        localStorage.setItem('token', token);
    },

    removeToken() {
        localStorage.removeItem('token');
    }

}