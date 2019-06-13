import { combineReducers } from 'redux';
import { lobyReducer } from '../components/combat/loby/lobyReducers';
import { chatReducer } from '../components/chat/chatReducers';

export default combineReducers({
    loby: lobyReducer,
    chat: chatReducer
});