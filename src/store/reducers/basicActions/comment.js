import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const categorySlice = createSlice({
    name: 'comment',
    initialState: {
        categories: [],
        loading: false,
        searchWord: '',
        activeCategory: ''
    },
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    }
});


export const { setCategories, setLoading, setSearchWord, setActiveCategory } = categorySlice.actions;

export const fetchCategories = () => async (dispatch) => {
    try {
        // dispatch(set(true));
        const response = await axios.post('http://localhost:3002/notification/comment');
        dispatch(setCategories(response.data));

    } catch (error) {

        console.log("There is an error when getting the categories: ", error);

    } finally {

        dispatch(setLoading(false));
    }
};



export default categorySlice.reducer;