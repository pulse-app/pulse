import {  createStore } from 'redux';
import userReducer from './reducers/reducer';

export default createStore(userReducer);