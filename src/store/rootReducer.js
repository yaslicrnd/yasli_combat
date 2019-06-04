import { combineReducers } from 'redux';
import { interfaceReducer } from '../components/combat/loby/interface/interfaceReducers';
import { playerReducer } from '../components/combat/loby/player/playerReducers';

export default combineReducers({
    interface: interfaceReducer,
    player: playerReducer
});