import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./reducers/auth/user.reducer";
import profileReducer from './reducers/profile/profile.reducer';
import refreshReducer from './reducers/profile/refresh';
import searchReducer from "./reducers/Search";
import storiesReducer from './reducers/stories/stories.reducer';
import postReducer from './reducers/basicActions/post';

import { MessagesReducer } from "./reducers/chat/messages.reducer";
import { ChatListReducer } from "./reducers/chat/chatList.reducer";
import { FavoriteReducer } from "./reducers/favorite/favorite";

import notificationSlice from './reducers/notificationAction';

const store = configureStore({
    reducer: {
        user: userReducer,
        search: searchReducer,
        messages: MessagesReducer,
        ChatList: ChatListReducer,
        profile: profileReducer,
        refresh: refreshReducer,
        post: postReducer,
        Favorite: FavoriteReducer,
        notification: notificationSlice,
        stories: storiesReducer
    }
});

export default store;




