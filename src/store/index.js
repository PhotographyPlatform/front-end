import { createStore, combineReducers, applyMiddleware } from "redux";
import user from "./reducers/auth/user.reducer";
import profile from './reducers/profile/profile.reducer'
import refresh from './reducers/profile/refresh'
import thunk from './middleWare/thunk'
import { configureStore } from '@reduxjs/toolkit';
import searchReducer from "./reducers/Search";
import { MessagesReducer } from "./reducers/chat/messages.reducer";
import { ChatListReducer } from "./reducers/chat/chatList.reducer";
import postReducer from './reducers/basicActions/post'

// import thunk from 'redux-thunk';

// const reducers = combineReducers({ user });


// const store = () => {
//     return createStore(reducers, applyMiddleware(thunk))
// }

// export default store()



// toolkit Store 

const store = configureStore({

    reducer: { user: user, search: searchReducer, messages: MessagesReducer, ChatList: ChatListReducer, profile: profile, refresh: refresh, post: postReducer  }

})


export default store;