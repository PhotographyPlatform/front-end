import { createStore, combineReducers, applyMiddleware } from "redux";
import user from "./reducers/auth/user.reducer";
import profile from './reducers/profile/profile.reducer'
import refresh from './reducers/profile/refresh'

import thunk from './middleWare/thunk'
import { configureStore } from '@reduxjs/toolkit';
// import thunk from 'redux-thunk';

// const reducers = combineReducers({ user });


// const store = () => {
//     return createStore(reducers, applyMiddleware(thunk))
// }

// export default store()



// toolkit Store 

const store = configureStore({
    reducer: { user: user, profile: profile, refresh: refresh }
})

export default store;