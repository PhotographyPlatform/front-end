import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from "react-cookies";

// const BASE_URL = 'http://localhost:3002';
const BASE_URL = process.env.REACT_APP_URL;


const postSlice = createSlice({
    name: 'post',
    initialState: {
        postDetails: {},
        commentsList: [],
        likeList: {},
        loading: false,
        numEffect: 0,
        commentActive: false
    },
    reducers: {
        setPostData(state, action) {
            state.commentsList = null;
            state.postDetails = null;
            state.postDetails = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setLikeList(state, action) {
            state.likeList = action.payload;
        },
        setCommentsList(state, action) {
            state.commentsList = null;
            state.commentsList = action.payload;
        },
        setNumEffectt(state) {
            state.numEffect += 1;
        },
        setCommentActive(state) {
            state.commentActive = !state.commentActive;
        }
    },
});

export const { setPostData, setLoading, setLikeList, setCommentsList, setNumEffectt, setCommentActive } = postSlice.actions;

export const fetchPostData = (postId) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get(`${BASE_URL}/getAllPostData/${postId}`);
        dispatch(setPostData(response.data));
        dispatch(setLikeList(response.data[0].likes));
        dispatch(fetchComments(response.data[0].comments));

    } catch (error) {
        console.log("There is an error when getting the post Details: ", error);
    } finally {
        dispatch(setLoading(false));
    }
};

export const removePost = (postId) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const userToken = Cookies.load('user_session');

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
        };
        const obj = {
            postid: postId
        }
        const response = await axios.post(`${BASE_URL}/post`, obj, { headers });
        console.log('Post removed successfully:', response);

    } catch (error) {
        console.log("There is an error when removing the Post: ", error);
    } finally {
        // dispatch(setNumEffectt())
    }
};


export const fetchComments = (commentsList) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const commentsData = [];
        for (const item of commentsList) {
            const response = await axios.get(`${BASE_URL}/v1/newUserCOll/${item.userid}`);
            const obj = {
                owner: {
                    username: response.data.data.username,
                    img: response.data.data.img,
                    Id: response.data.data.id,
                },
                comment: {
                    id: item.id,
                    content: item.contant,
                    createdAt: item.createdAt
                },
            };
            commentsData.push(obj);
        }
        dispatch(setCommentsList(commentsData));
    } catch (error) {
        console.log("There is an error when getting the Comments: ", error);
    } finally {
        dispatch(setLoading(false));
    }
};



export const setComment = (comment) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const userToken = Cookies.load('user_session');

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
        };

        const response = await axios.post(`${BASE_URL}/notification/comment`, comment, { headers });
        console.log('Comment posted successfully:', response.data);
        dispatch(fetchPostData());
    } catch (error) {
        console.log("There is an error when posting the comment: ", error);
    } finally {
        dispatch(setLoading(false));
        dispatch(setNumEffectt())

    }
};

export const removeComment = (commentId) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const userToken = Cookies.load('user_session');

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
        };
        const obj = {
            commentid: commentId
        }
        const response = await axios.post(`${BASE_URL}/comment`, obj, { headers });
        console.log('Comment removed successfully:', response);

    } catch (error) {
        console.log("There is an error when removing the comment: ", error);
    } finally {
        dispatch(setLoading(false));

        dispatch(setNumEffectt())
    }
};






export const setLike = (postid) => async (dispatch) => {
    try {
        const userToken = Cookies.load('user_session');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`,
        };
        const obj = {
            postid: postid
        }
        const response = await axios.post(`${BASE_URL}/notification/likes`, obj, { headers });
        console.log('Like posted successfully:', response.data);
    } catch (error) {
        console.log("There is an error when posting the like: ", error);
    } finally {
        dispatch(setNumEffectt())
    }
};

export const removeLike = (postid) => async (dispatch) => {
    try {
        const userToken = Cookies.load('user_session');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`,
        };
        const obj = {
            "postid": postid
        }
        const response = await axios.post(`${BASE_URL}/likes`, obj, { headers });
        console.log('Like removed successfully:', response.data);
    } catch (error) {
        console.log("There is an error when removing the like: ", error);
    } finally {
        dispatch(setNumEffectt())
    }
};


export const handleCommentActive = () => (dispatch) => {

    dispatch(setCommentActive());
};
export default postSlice.reducer;
