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
            cookies.save('user_session', payload.data.token)
            const dataToEncrypt = JSON.stringify(payload.data)
            const secretKey = process.env.SECRETKEY || 'pixel'
            const encryptedData = CryptoJS.AES.encrypt(dataToEncrypt, secretKey).toString();
            cookies.save('user', encryptedData)
            return { state, user: { ...payload, isLogged: true } }
        case 'LOG_OUT':
            cookies.remove('user_session')
            cookies.remove('user')
            return { ...state, user: { isLogged: false } }
        default:
            return state
    }
}


export const logOut = () => ({
    type: 'LOG_OUT'
})

export const signin = (user) => ({
    type: 'SIGN_IN',
    payload: user
})