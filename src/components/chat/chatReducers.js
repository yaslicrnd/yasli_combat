const beginState = {
    messages: [],
    users: []
};

export const chatReducer = (state = beginState, action) => {
    switch (action.type) {

        case 'ACTION_UPDATE_MESSAGES':
            return updateMessages(action.messages, state);

        default:
            return state;
    }
}

const updateMessages = (messages, state) => {
    return { ...state, messages: messages };
}