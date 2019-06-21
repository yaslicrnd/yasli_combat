export default {

    setToken(token) {
        return localStorage.setItem('token', token);
    },

    getToken() {
        return localStorage.getItem('token');
    },

    removeToken() {
        localStorage.removeItem('token');
    },

    setUserInfo(user) {
        localStorage.setItem('user', JSON.stringify( { ...user, health: 30 } ));
    },

    getUserInfo() {
        return JSON.parse(localStorage.getItem('user'));
    },

    setCombat(combatId) {
        localStorage.setItem('combat', combatId);
    },

    getCombat() {
        return localStorage.getItem('combat');
    },

    removeCombat() {
        localStorage.removeItem('combat');
    }

}