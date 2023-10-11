import axios from "axios"



const initialStete = {
     UserList: [],
     userNotification: {},
     userInfo: {},
     AllNotification : 0
}


export const ChatListReducer = (state = initialStete , actions) => {
     const { type, payload } = actions
     // console.log('payload' , payload);

     switch (type) {
          case 'GetUserList':
               return { ...state, UserList: payload.UserList, userNotification: payload.userNotification }
          case 'UserInfo':
               return {...state , userInfo : payload }
          case 'AllNotification':
               // console.log('AllNotification' , payload);
               return {...state , AllNotification : payload }
          default:
              return state
     }
}


export const fetchUserListRedux = (userId) => async (dispatch) => {
     const res = await axios.get(`http://localhost:3002/messegeslist/${userId}`)        
     const result = res.data.data
     let msgCount = []

     for (const ele of result) {
          
          let filter = ele.messages.filter(ele => ele.read === false)
          msgCount.push({ userInfo: ele.data.id, nonRead: filter.length })
     }
     console.log(msgCount, 'count');
     dispatch(dispatchUserList(result , msgCount))

}

const dispatchUserList = (UserList , userNotification) => {
     return {
          type: 'GetUserList',
          payload : {UserList , userNotification}
     }
}

export const fetchUserInfo = (id ,cookieData ) => async dispatch => {
     const response = await axios.get(`http://localhost:3002/getOtherDataUser/${id}`, { headers: { Authorization: `Bearer ${cookieData}` } })
     dispatch(dispatchUserInfo(response.data))
}

const dispatchUserInfo = (data) => {
     return {
          type: 'UserInfo',
          payload : data
     }
}

export const dispatchAllNotification = (data) => {
     return {
          type: 'AllNotification',
          payload : data
     }
}

export const getNotification = (cookieData) =>  async (dispatch) => {
     try {
       const result = await axios.get('http://localhost:3002/allUserMessages', { headers: { Authorization: `Bearer ${cookieData}` } })
       let notificationCount = result.data.recievedData.filter(ele => {
         return ele.read === false
       })
       // console.log('notificationCount', notificationCount.length);
       dispatch(dispatchAllNotification(notificationCount.length))
       
     } catch (err) {
       console.log(err);
     }
   }