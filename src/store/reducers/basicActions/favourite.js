import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from "react-cookies";

const BASE_URL = 'http://localhost:3002';

const favouriteSlice = createSlice({
    name: 'post',
    initialState: {
        favouriteList: [],
        loading: false,
        Effect: 0,
    },
    reducers: {
        setPostData(state, action) {
            state.postDetails = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setLikeList(state, action) {
            state.likeList = action.payload;
        },
        setCommentsList(state, action) {
            state.commentsList = action.payload;
        },
        setNumEffectt(state) {
            state.numEffect += 1;
        },
    },
});
