/**
 * Created by ljy on 16/9/25.
 */
import { combineReducers } from 'redux';
import MyHisListReducer from './MyHisListReducer';
import AddHisProjReducer from './AddHisProjReducer';

export default combineReducers({
    myHisListState:MyHisListReducer,
    addHisProjState:AddHisProjReducer,
});
