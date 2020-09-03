import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { contactListReducer, contactDetailsReducer, contactSaveReducer, contactDeleteReducer } from './reducers/contactReducers';
import thunk from 'redux-thunk';
// import Cookie from "js-cookie";

const initialState = {};
const reducer = combineReducers({
    contactList: contactListReducer,
    contactDetails: contactDetailsReducer,
    contactSave: contactSaveReducer,
    contactDelete: contactDeleteReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk)));

export default store;