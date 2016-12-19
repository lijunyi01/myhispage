/**
 * Created by ljy on 16/9/25.
 */
import { combineReducers } from 'redux';
import MyHisListReducer from './MyHisListReducer';
import UserSetReducer from './UserSetReducer';

export default combineReducers({
    myHisListState:MyHisListReducer,
    userSetState:UserSetReducer
});
