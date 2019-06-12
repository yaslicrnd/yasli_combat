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