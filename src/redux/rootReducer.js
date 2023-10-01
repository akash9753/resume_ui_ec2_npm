import { combineReducers } from 'redux';
import AuthReducer from "./features/authSlice"
import ResumeReducer from "./features/resumeSlice"
import tempReducer from './features/tempSlice';

const reducer={
    auth: AuthReducer,
    resumeForm:ResumeReducer,
    temp:tempReducer
}
 
export default combineReducers(reducer)