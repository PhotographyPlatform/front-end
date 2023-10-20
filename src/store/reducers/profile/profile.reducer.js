import axios from "axios";
import cookies from 'react-cookies'
import CryptoJS from 'crypto-js';

// Initial state
const PROFILE_STATE = {
    profile: null,
}
const URL = process.env.REACT_APP_URL;

// Reducer
export default (state = PROFILE_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'EDIT_PROFILE':
            return { ...state, profile: payload };
        case 'UPDATE_PROFILE':
            console.log(payload);
            cookies.remove('user')
            const dataToEncrypt = JSON.stringify(payload)
            const secretKey = 'pixel'
            const encryptedData = CryptoJS.AES.encrypt(dataToEncrypt, secretKey).toString();
            cookies.save('user', encryptedData)
            return { ...state, profile: encryptedData }
        case 'GET_Followers':
            return { ...state, followers: payload };
        case 'GET_Following':
            return { ...state, following: payload };
        case 'GET_USER_PROFILE':
            return { ...state, userProfile: payload };
        case 'ADD_FOLLOW':
            return { ...state, refresh: payload };
        case 'UPLOAD':
            return { ...state, images: payload };
        case 'GET_IMAGES':
            return { ...state, allImages: payload };

        default:
            return state;
    }
}

export const profileEdit = (payload) => async dispatch => {
    try {
        if (!payload.username) {
            const obj = {
                firstName: payload.firstName,
                lastName: payload.lastName,
                address: payload.address,
                birthday: payload.birthday,
            }
            const token = cookies.load('user_session');
            const response = await axios.patch(`${URL}/profile`, obj, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            dispatch(profile(response.status));
        } else {
            const token = cookies.load('user_session');
            const response = await axios.patch(`${URL}/profile`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            dispatch(profile(response.status));
        }
    } catch (error) {
        if (error.response) {
            console.log(error.response.data.message);
            dispatch(profile(error.response.data.message));
        } else if (error.request) {
            console.error('No response from the server:', error.request);
        } else {
            console.error('Error while making the request:', error.message);
        }
    }
}


export const getFollowing = () => async dispatch => {
    try {
        const token = cookies.load('user_session');
        if (!token) {
            console.log('invalid token');
            return;
        }

        const response = await axios.get(`${URL}/Following`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch(following(response.data));
    } catch (error) {
        console.error('Error fetching following:', error);
    }
};

export const getFollowers = () => async dispatch => {
    try {
        const token = cookies.load('user_session');
        if (!token) {
            console.log('invalid token');
            return;
        }

        const response = await axios.get(`${URL}/Followers`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch(followers(response.data));
    } catch (error) {
        console.error('Error fetching followers:', error);
    }
};

export const getProfile = (id) => async dispatch => {
    try {
        const token = cookies.load('user_session');
        if (!token) {
            console.log('invalid token');
            return;
        }
        const response = await axios.get(`${URL}/profile/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch(getUserProfile(response.data));
    } catch (error) {
        console.error('Error fetching following:', error);
    }
};


export const Follow = (id) => async dispatch => {
    try {
        const token = cookies.load('user_session');
        if (!token) {
            console.log('invalid token');
            return;
        }
        const response = await axios.post(`${URL}/notification/follow`, { following_id: id }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch(follow(response.data));
    } catch (error) {
        dispatch(profile(error.response.status));
        console.error('Error add follower:', error);
    }
};

export const unFollow = (id) => async dispatch => {
    try {
        const token = cookies.load('user_session');
        if (!token) {
            console.log('invalid token');
            return;
        }
        const response = await axios.delete(`${URL}/unfollow`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: { following_id: id },
        });
        dispatch(follow(response.data));
    } catch (error) {
        dispatch(profile(error.response.status));
        console.error('Error add follower:', error);
    }
};

export const removeFollower = (id) => async dispatch => {
    try {
        const token = cookies.load('user_session');
        if (!token) {
            console.log('invalid token');
            return;
        }
        const response = await axios.delete(`${URL}/unfollow`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: { followers_id: id },
        });
        dispatch(follow(response.data));
    } catch (error) {
        dispatch(profile(error.response.status));
        console.error('Error add follower:', error);
    }
};


export const uploadImage = (image) => async dispatch => {
    const token = cookies.load('user_session');
    const formData = new FormData();
    formData.append('image', image)
    await axios.post(`${URL}/profileImage`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
        .then(res => {
            dispatch(upload(res))
        })
}


export const uploadHero = (image) => async dispatch => {
    const token = cookies.load('user_session');
    const formData = new FormData();
    formData.append('image', image)
    await axios.post(`${URL}/heroImage`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
        .then(res => {
            dispatch(upload(res))
        })
}


export const getImages = () => async dispatch => {
    try {
        const token = cookies.load('user_session');
        const response = await axios.get(`${URL}/v2/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const obj = {
            heroImage: response.data.heroImage,
            profileImg: response.data.profileImg,
        }
        dispatch(getImage(obj));
    } catch (error) {
        console.error('Error fetching images:', error);
    }
};

export const profile = (user) => ({
    type: 'EDIT_PROFILE',
    payload: user
});

export const followers = (user) => ({
    type: 'GET_Followers',
    payload: user
});

export const following = (data) => ({
    type: 'GET_Following',
    payload: data
});

export const update = (user) => ({
    type: 'UPDATE_PROFILE',
    payload: user
});


export const getUserProfile = (user) => ({
    type: 'GET_USER_PROFILE',
    payload: user
});

export const follow = (user) => ({
    type: 'ADD_FOLLOW',
    payload: user
});

export const upload = (user) => ({
    type: 'UPLOAD',
    payload: user
});

export const getImage = (image) => ({
    type: 'GET_IMAGES',
    payload: image
});


