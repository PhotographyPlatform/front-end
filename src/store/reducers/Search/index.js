import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const categorySlice = createSlice({
    name: 'counter',
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
        const response = await axios.get('http://localhost:3002/getAllCategory');
        dispatch(setCategories(response.data));
        dispatch(setLoading(true))

    } catch (error) {
        console.log("There is an error when getting the categories: ", error);

    } finally {
        dispatch(setLoading(false));
    }
};



export default categorySlice.reducer;