import axios from "axios";
import cookies from 'react-cookies'

const USER_STATE = {
    user: [],
}

export default (state = USER_STATE, action) => {
    const { type, payload } = action
    switch (type) {
        case 'SIGN_UP':
            cookies.save('auth', payload.data.token)
            localStorage.setItem('user', JSON.stringify(payload.data))
            return { ...state, user: { ...payload, isLogged: true } }
        default:
            return state
    }
}

export const handlePromise = (payload) => async dispatch => {
    const data = await axios.post('http://localhost:3002/signup/confirm', { codes: payload })
    dispatch(signup(data))
}

export const signup = (user) => ({
    type: 'SIGN_UP',
    payload: user
})

export const signin = (user) => {
    
}


// export const deleteCart = (product) => ({
//     type: 'DELETE_CART',
//     payload: product
// })