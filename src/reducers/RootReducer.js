/**
 * Created by ljy on 16/9/25.
 */
import { combineReducers } from 'redux';
import MyHisListReducer from './MyHisListReducer';

export default combineReducers({
    myHisListState:MyHisListReducer,
});
