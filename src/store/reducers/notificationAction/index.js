import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from "react-cookies";


const notifiSlice = createSlice({
    name: 'post',
    initialState: {
        old: [],
        new: [],
        numEffect: 0,
        read: true,
        count: 0,
    },
    reducers: {
        setOldNotifi(state, action) {
            const newItem = action.payload;

            if (!state.old.some(existingItem => existingItem.id === newItem.id)) {
                state.old = [...state.old, newItem];
            }
        },
        setNewNotifi(state, action) {
            const newItem = action.payload;
            if (!state.new.some(existingItem => existingItem.id === newItem.id)) {
                state.new = [...state.new, newItem];
            }
        },
        setCountNotifi(state, action) {
            state.count = action.payload;
        },
        setEffect(state, action) {
            state.numEffect += 1;
        },
        setRead(state, action) {
            state.read = action.payload;
        },
    },
});

export const {
    setOldNotifi,
    setNewNotifi,
    setCountNotifi,
    setEffect,
    setRead,
} = notifiSlice.actions;

export default notifiSlice.reducer;



// const BASE_URL = 'http://localhost:3002';
