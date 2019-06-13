import authHelpers from '../../auth/authHelpers';

const beginState = {
    status: 1,
    players: {
        you: authHelpers.getUserInfo(),
        enemy: {health: 30}
    },
    items: {
        you: {'head' : false, 'body' : false, 'belt' : false, 'feet' : false, 'size' : 0}, 
        enemy: {'head' : false, 'body' : false, 'belt' : false, 'feet' : false, 'size' : 0}
    },
    maxSize: {'you' : 2, 'enemy' : 1},
    results: [],
    turn_status: null
};

export const lobyReducer = (state = beginState, action) => {
    switch (action.type) {

        case 'ACTION_RESET_ITEMS':
            return resetItems(state);

        case 'ACTION_CHANGE_ITEM':
            return changeItem(action.event, action.side, state);

        case 'ACTION_UPDATE_PLAYERS':
            return changePlayers(action.info, state);

        case 'ACTION_CHANGE_STATUS':
            return changeStatus(action.status, state);

        case 'ACTION_CHANGE_RESULTS':
            return changeResults(action.results, state);

        case 'ACTION_CHANGE_TURN_STATUS':
            return changeTrunStatus(action.turn_status, state);
            
        default: 
            return state;
        
    }
}

const resetItems = (state) => {
    return {
        ...state,
        items: {
            you: {'head' : false, 'body' : false, 'belt' : false, 'feet' : false, 'size' : 0}, 
            enemy: {'head' : false, 'body' : false, 'belt' : false, 'feet' : false, 'size' : 0}
        }
    };
}

const changeTrunStatus = (turn_status, state) => {
    return { ...state, turn_status: turn_status };
}

const changeStatus = (status, state) => {
    return { ...state, status: status };
}

const changeResults = (results, state) => {
    return { ...state, results: results };
}

const changePlayers = (info, state) => {
    let { you, enemy } = info;

    return {
        ...state,
        players: {
            you: { ...state.players.you, ...you },
            enemy: { ...enemy }
        }
    };
}

const changeItem = (event, side, state) => {
    let item = event.target.dataset.item;
    let items = state.items[side];

    if((!items[item] && state.maxSize[side] !== items.size) || items[item]) {

        return {
            ...state,
            items: {
                ...state.items,
                [side]: {
                    ...items,
                    size: items[item] ? --items.size : ++items.size, 
                    [item]: !items[item] 
                }
            }
        };
        
    } else {
        return state;
    }

}