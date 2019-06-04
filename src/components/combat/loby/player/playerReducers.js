const beginState = {
    atack: {},
    defence: {}
};

export const playerReducer = (state = beginState, action) => {
    switch (action.type) {
        case 'ACTION_CHANGE_ATACK':
            return { ...state, atack: action.change };
        case 'ACTION_CHANGE_DEFENCE':
            return { ...state, defence: action.change };
    }
    
    return state;
}