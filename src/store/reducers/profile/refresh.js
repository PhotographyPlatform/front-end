import { createSlice } from "@reduxjs/toolkit";

const refresh = createSlice({
  name: 'refresh',
  initialState: {
    number: 0
  },
  reducers: {
    setTrue: (state) => {
      state.number += 1; // Correctly update the "number" property
    }
  }
});

export const { setTrue } = refresh.actions;
export default refresh.reducer;
