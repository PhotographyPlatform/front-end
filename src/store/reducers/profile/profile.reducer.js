import axios from "axios";
import cookies from 'react-cookies'
const PROFILE_STATE = {
    profile: [],
}

export default (state = PROFILE_STATE, action) => {
    const { type, payload } = action
    switch (type) {
        case 'EDIT_PROFILE':
            return { ...state, payload }
        default:
            return state
    }


}

export const profileEdit = (payload) => async dispatch => {
    const token = cookies.load('user_session')
    const data = await axios.patch('http://localhost:3002/profile', payload, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    dispatch(profile(data))
}

export const profile = (user) => ({
    type: 'EDIT_PROFILE',
    payload: user
})