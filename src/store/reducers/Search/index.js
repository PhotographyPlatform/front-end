import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        loading: false,
        searchWord : '',
        activeCategory:''
    },
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setSearchWord: (state, action) => {
            state.searchWord = action.payload;
        },
        setActiveCategory: (state, action) => {
            state.activeCategory = action.payload;
        }
    }
});


export const { setCategories, setLoading, setSearchWord, setActiveCategory } = categorySlice.actions;

export const fetchCategories = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get('http://localhost:3002/getAllCategory');
        dispatch(setCategories(response.data));

    } catch (error) {

        console.log("There is an error when getting the categories: ", error);

    } finally {
        
        dispatch(setLoading(false));
    }
};



export default categorySlice.reducer;