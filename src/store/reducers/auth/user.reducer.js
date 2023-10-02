import axios from "axios";
import cookies from 'react-cookies'
import CryptoJS from 'crypto-js';
const USER_STATE = {
    user: [],
}

export default (state = USER_STATE, action) => {
    const { type, payload } = action
    switch (type) {
        case 'SIGN_IN':
            if (payload.status === 200) {
                cookies.save('user_session', payload.data.token)
                const dataToEncrypt = JSON.stringify(payload.data)
                const secretKey = process.env.SECRETKEY || 'pixel'
                const encryptedData = CryptoJS.AES.encrypt(dataToEncrypt, secretKey).toString();
                cookies.save('user', encryptedData)
                return { state, user: { ...payload, isLogged: true } }
            }
            return { state, user: { isLogged: false } }

        case 'LOG_OUT':
            cookies.remove('user_session')
            cookies.remove('user')
            return { ...state, user: { isLogged: false } }

        case 'EDIT_PROFILE':
            console.log(payload);
            return { ...state, payload }
        default:
            return state
    }
}

export const signinHandler = (payload) => async dispatch => {
    const data = await axios.post('http://localhost:3002/login', null, {
        headers: {
            Authorization: `Basic ${btoa(`${payload.username}:${payload.password}`)}`
        }
    })
    dispatch(signin(data))
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

export const logOut = () => ({
    type: 'LOG_OUT'
})

export const signin = (user) => ({
    type: 'SIGN_IN',
    payload: user
})