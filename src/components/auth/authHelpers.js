export default {

    getToken() {
        return localStorage.getItem('token');
    },

    setToken(token) {
        localStorage.setItem('token', token);
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

    getCombat() {
        return localStorage.getItem('combat');
    },

    setCombat(combatId) {
        localStorage.setItem('combat', combatId);
    },

    removeCombat() {
        localStorage.removeItem('combat');
    }

}