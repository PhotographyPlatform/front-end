import { createStore, combineReducers, applyMiddleware } from "redux";
import user from "./reducers/auth/user.reducer";
import thunk from './middleWare/thunk'
import { configureStore } from '@reduxjs/toolkit';
import searchReducer from "./reducers/Search";
import  { MessagesReducer } from "./reducers/chat/messages.reducer";
import { ChatListReducer } from "./reducers/chat/chatList.reducer";
// import thunk from 'redux-thunk';

// const reducers = combineReducers({ user });


// const store = () => {
//     return createStore(reducers, applyMiddleware(thunk))
// }

// export default store()



// toolkit Store 

const store = configureStore({
    reducer: { user: user, search: searchReducer, messages : MessagesReducer  , ChatList : ChatListReducer}
})


export default store;