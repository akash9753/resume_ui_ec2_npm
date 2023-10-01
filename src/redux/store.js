import combineReducers from './rootReducer';
import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage/session';
import {
  persistReducer,
} from 'redux-persist'
import thunk from 'redux-thunk';
import { setupListeners } from '@reduxjs/toolkit/query'
import { PURGE_STATE } from '../components/header/Navbar';
const persistConfig = {
    key: 'root',
    storage: storage,
  };

const appReducer=(state,action)=>{
  if(action.type===PURGE_STATE){
    storage.removeItem(`persist:root`);
    sessionStorage.clear()
    state=undefined
  }
  return combineReducers(state,action)
}

const persistedReducer = persistReducer(persistConfig, appReducer)
const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})
setupListeners(store.dispatch)
export default store
