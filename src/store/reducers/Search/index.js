import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        loading: false,
    },
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});


export const { setCategories, setLoading } = categorySlice.actions;

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