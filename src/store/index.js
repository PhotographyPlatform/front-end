import { createStore, combineReducers, applyMiddleware } from "redux";
import user from "./reducers/auth/user.reducer";
import thunk from './middleWare/thunk'
// import thunk from 'redux-thunk';
const reducers = combineReducers({ user });
const store = () => {
    return createStore(reducers, applyMiddleware(thunk))
}

export default store()