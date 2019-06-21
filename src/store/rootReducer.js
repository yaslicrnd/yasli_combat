import { combineReducers } from 'redux';
import { lobyReducer } from '../components/combat/loby/lobyReducers';
import { chatReducer } from '../components/chat/chatReducers';
import { popupReducer } from '../components/popup/popupReducers';

export default combineReducers({
    loby: lobyReducer,
    chat: chatReducer,
    popup: popupReducer
});