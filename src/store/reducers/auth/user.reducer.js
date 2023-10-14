import cookies from 'react-cookies';
import CryptoJS from 'crypto-js';
import { useDispatch } from 'react-redux'
import jwtDecode from "jwt-decode";

const session_user = cookies.load('user_session');
let decoded = null;

if (session_user) {
    decoded = jwtDecode(session_user);
}

const USER_STATE = {
    user: [],
    token: decoded
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
        case 'USER_DATA':
            const decodedData = CryptoJS.AES.decrypt(payload, 'pixel').toString(CryptoJS.enc.Utf8)
            return { user: JSON.parse(decodedData) }
        case 'DECODE_TOKEN':
            const Detoken = cookies.load('user_session');
            const decoded = jwtDecode(Detoken);

            return { ...state, token: decoded };
        case 'LOG_OUT':
            cookies.remove('user_session')
            cookies.remove('user')
            return { ...state, user: { isLogged: false } }
        case 'id':
            return { ...state, user: payload }
        default:
            return state
    }
}

export const logOut = () => ({
    type: "LOG_OUT",
});

export const signin = (user) => ({
    type: "SIGN_IN",
    payload: user,
});

export const id = (id) => ({
    type: "id",
    payload: id,
});

export const uderData = (user) => ({
    type: "USER_DATA",
    payload: user,
});

export const DecodeToken = () => ({
    type: 'DECODE_TOKEN'
})


/* eslint-enable */
