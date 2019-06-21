const beginState = {
    isShow: false,
    data: {
        title: '',
        message: '',
        clickFunc: null
    }
};

export const popupReducer = (state = beginState, action) => {

    switch (action.type) {
        case 'ACTION_STATE_POPUP':
            return statePopup(state, action.data);

        default: 
            return state;
    }

}

const statePopup = (state, newData) => {
    return { 
        ...state, 
        data: {
            ...state.data,
            ...newData
        },
        isShow: !state.isShow
    };
}