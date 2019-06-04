const beginState = {
    valid: false,
};

export const interfaceReducer = (state = beginState, action) => {
    switch (action.type) {
        case 'CHECK_VALID_STEP':
            // проверка на валидность
            // в зависимости от значений изменяется state.valid
            return { ...state, email: action.change };
    }
        
    return state;
}