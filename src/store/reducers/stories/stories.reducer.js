import axios from "axios";
import Cookies from "react-cookies";

const initialState = {

}

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'GET_STORY':
            return { ...state, myStories: payload };
        case 'GET_OTHER_STORY':
            return { ...state, otherStories: payload };
        default:
            return state;
    }
}


export const getStories = () => async dispatch => {
    try {
        const token = Cookies.load('user_session');
        if (!token) {
            console.log('invalid token');
            return;
        }
        const response = await axios.get('http://localhost:3002/story', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch(stories(response.data));
    } catch (error) {
        console.error('Error fetching following:', error);
    }
};


export const uploadImage = (image) => async dispatch => {
    const token = Cookies.load('user_session');
    const formData = new FormData();
    formData.append('storyUrl', image)
    await axios.post('http://localhost:3002/story', formData, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
        .then(res => {
            console.log(res);
        })
}


export const getOtherStories = (id) => async dispatch => {
    try {
        const token = Cookies.load('user_session');
        if (!token) {
            console.log('invalid token');
            return;
        }
        const response = await axios.get(`http://localhost:3002/story/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch(otherStories(response.data));
    } catch (error) {
        console.error('Error fetching following:', error);
    }
};


const stories = (story) => ({
    type: 'GET_STORY',
    payload: story
})

const otherStories = (story) => ({
    type: 'GET_OTHER_STORY',
    payload: story
})