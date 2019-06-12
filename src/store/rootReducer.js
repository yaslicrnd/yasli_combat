import { combineReducers } from 'redux';
import { lobyReducer } from '../components/combat/loby/lobyReducers';

export default combineReducers({
    loby: lobyReducer
});