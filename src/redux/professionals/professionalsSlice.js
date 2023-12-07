import { createSlice } from "@reduxjs/toolkit";

const PROFESSIONALS_INITIAL_STATE = {
  barbers: [],
};

const professionalsSlice = createSlice({
  name: "professionals",
  initialState: PROFESSIONALS_INITIAL_STATE,
  reducers: {
    setProfessionals: (state, action) => {
      state.barbers = action.payload;
    },
  },
});

export const { setProfessionals } = professionalsSlice.actions;
export default professionalsSlice.reducer;
