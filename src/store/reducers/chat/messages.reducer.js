import axios from 'axios';

export const initialState = {
     messages : []
}


export const MessagesReducer = (state = initialState, action) => {
     const { type, payload } = action
     
     switch (type) {
          case 'messageHandeler':
               return { ...state, messages: payload }
          case 'addMessage':
               return { ...state, messages: [...state.messages,payload] }
          default:
               return state
     }
}


export const messageThunk = (userId ,reciver ,cookieData ) =>  async (dispatch) => {
     console.log('fom reducer messageThunk',reciver, 'reciver', userId, 'sender');
     
     try {
          const res = await axios.get(`http://localhost:3002/chat/${reciver}`, { headers: { Authorization: `Bearer ${cookieData}` } })

          
          let resieveData = res.data.resieveData.map(async ele => {
               if (!ele.read) {
                    const makeItSeen = await axios.put(`http://localhost:3002/chat/${ele.id}/${reciver}`, { read: true }, { headers: { Authorization: `Bearer ${cookieData}` } })
                    return ele
               }
          })

          let msg = [...res.data.sendData, ...res.data.resieveData]
          let sortedMSG = msg.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
          
          dispatch(messageDispatch(msg))
          
     } catch (err) {     
          console.log( 'get message page error',err );
     }
}

export const messageDispatch = (data) => {
     return {
          type: 'messageHandeler',
          payload : data
     }
}

export const addMessage = (message) => {
     return {
          type: 'addMessage',
          payload : message
     }
}