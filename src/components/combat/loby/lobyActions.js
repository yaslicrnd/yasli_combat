export const changeStatusItem = (side, event) => ({
    type: 'ACTION_CHANGE_ITEM', side, event
});
export const changeStatusGame = status => ({
    type: 'ACTION_CHANGE_STATUS', status
});
export const changePlayers = (info) => ({
    type: 'ACTION_UPDATE_PLAYERS', info
});
export const resetStatusItems = (info) => ({
    type: 'ACTION_RESET_ITEMS', info
});
export const changeResults = (results) => ({
    type: 'ACTION_CHANGE_RESULTS', results
});
export const changeTurnStatus = (turn_status) => ({
    type: 'ACTION_CHANGE_TURN_STATUS', turn_status
});