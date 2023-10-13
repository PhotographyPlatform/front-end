import { createSlice } from "@reduxjs/toolkit";

const refresh = createSlice({
  name: 'refresh',
  initialState: {
    number: 0
  },
  reducers: {
    setTrue: (state) => {
      state.number += 1;
    }
  }
});

export const { setTrue } = refresh.actions;
export default refresh.reducer;
