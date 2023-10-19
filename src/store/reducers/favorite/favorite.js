import axios from "axios"

const initialState = {
     favoritePosts : []
}

const url = `http://localhost:3002`


export const FavoriteReducer = (state = initialState , actions) => {
     const { type, payload } = actions
     
     switch (type) {
          case 'GetFavoritePosts':
               return{...state , favoritePosts : payload}
          case 'addFavoritePost':
               return{...state , favoritePosts : [...state.favoritePosts , payload]}
          case 'removeFavorite':
               const filter = state.favoritePosts.filter(ele => {
                    if(ele) return +ele.id !== +payload
               })
               return{...state , favoritePosts :filter}
          default:
               return state
     }
}

export const fetchFavoritePosts = (cookieData) => async dispatch => {
     try {
          const res = await axios.get(`${url}/favorites`, { headers: { Authorization: `Bearer ${cookieData}` } })
          dispatch(dispatchFavoritePosts(res.data.favorites))
     } catch (err) {
          console.log(err);
     }
}

const dispatchFavoritePosts = (data) => {
     return {
          type: 'GetFavoritePosts',
          payload : data
     }
}

export const addFavoritePost = (cookieData , postid) => async dispatch => {
     try {
          console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%POST ID ",postid)
          const res = await axios.post(`${url}/favorites`, {postid}, { headers: { Authorization: `Bearer ${cookieData}` } })
          dispatch(dispatchFavoritePost(res.data.favorites))
          console.log('favorites, Added Sucssufully', res)
     } catch (err) {
          console.log(err);
     }
}

const dispatchFavoritePost = (data) => {
     return {
          type: 'addFavoritePost',
          payload :data
     }
}

export const removeFavorite = (cookieData , id) => async dispatch =>{
     try {
          const res = await axios.delete(`${url}/favorites/${id}`, { headers: { Authorization: `Bearer ${cookieData}` } })
          dispatch(dispatchRemoveFavorite(id))
          console.log('favorites, removed Sucssufully', res)

     } catch (err) {
          console.log(err);
     }
}

const dispatchRemoveFavorite = (data) => {
     return {
          type: 'removeFavorite',
          payload : data
     }
}

