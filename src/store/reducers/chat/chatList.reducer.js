import axios from "axios"



const initialStete = {
     UserList: [],
     userNotification: {},
     userInfo: {},
     AllNotification: 0,
     folowingChatList: [],
     SearchFolowingChatList: []
}


export const ChatListReducer = (state = initialStete, actions) => {
     const { type, payload } = actions
     // console.log('payload' , payload);

     switch (type) {
          // UserList
          case 'GetUserList':
               return { ...state, UserList: payload.UserList, userNotification: payload.userNotification }
          case 'SearchUserList':
               let filterUserList = state.UserList.filter(ele => ele.data.username.includes(payload))
               return { ...state, UserList: filterUserList }

          // UserInfo and Notification
          case 'UserInfo':
               return { ...state, userInfo: payload }
          case 'AllNotification':
               return { ...state, AllNotification: payload }

          // FolowingChatList
          case 'FolowingChatList':
               return { ...state, folowingChatList: payload }
          case 'SearchFolowingChatList':
               let filter = state.folowingChatList.filter(ele => ele.name.includes(payload))
               return { ...state, folowingChatList: filter }

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
     // console.log(msgCount, 'count');
     dispatch(dispatchUserList(result, msgCount))

}

const dispatchUserList = (UserList, userNotification) => {
     return {
          type: 'GetUserList',
          payload: { UserList, userNotification }
     }
}

export const fetchUserInfo = (id, cookieData) => async dispatch => {
     const response = await axios.get(`http://localhost:3002/getOtherDataUser/${id}`, { headers: { Authorization: `Bearer ${cookieData}` } })
     dispatch(dispatchUserInfo(response.data))
}

const dispatchUserInfo = (data) => {
     return {
          type: 'UserInfo',
          payload: data
     }
}

export const dispatchAllNotification = (data) => {
     return {
          type: 'AllNotification',
          payload: data
     }
}

export const getNotification = (cookieData) => async (dispatch) => {
     try {
          const result = await axios.get('http://localhost:3002/allUserMessages', { headers: { Authorization: `Bearer ${cookieData}` } })
          let notificationCount = result.data.recievedData.filter(ele => {
               return ele.read === false
          })
          console.log('notificationCount', notificationCount.length);
          dispatch(dispatchAllNotification(notificationCount.length))

     } catch (err) {
          console.log(err);
     }
}



export const fetchFolowingChatList = (cookieData) => async dispatch => {
     try {
          const response = await axios.get('http://localhost:3002/Following', { headers: { Authorization: `Bearer ${cookieData}` } })
          dispatch(dispatchFolowingChatList(response.data.Following))
     } catch (err) {
          console.log(err);
     }
}
export const dispatchFolowingChatList = (data) => {
     return {
          type: 'FolowingChatList',
          payload: data
     }
}
export const dispatchSearchFolowingChatList = (data) => {
     return {
          type: 'SearchFolowingChatList',
          payload: data
     }
}
export const dispatchSearchUserList = (data) => {
     return {
          type: 'SearchUserList',
          payload: data
     }
}

