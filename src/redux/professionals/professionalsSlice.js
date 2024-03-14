import { createSlice } from "@reduxjs/toolkit";

const PROFESSIONALS_INITIAL_STATE = {
  barbers: [],
  loading: false,
  error: null,
};

const professionalsSlice = createSlice({
  name: "professionals",
  initialState: PROFESSIONALS_INITIAL_STATE,
  reducers: {
    setProfessionals: (state, action) => {
      state.barbers = action.payload;
    },
    fetchBarbersStart: (state) => {
      state.loading = true;
    },
    fetchBarbersSuccess: (state) => {
      state.loading = false;
      state.barbers = action.payload;
    },
    fetchBarbersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addBarberStart(state) {
      state.loading = true;
    },
    addBarberSuccess(state) {
      state.loading = false;
    },
    addBarberFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setProfessionals,
  addBarberStart,
  addBarberSuccess,
  addBarberFailure,
  fetchBarbersFailure,
  fetchBarbersSuccess,
  fetchBarbersStart,
} = professionalsSlice.actions;
export default professionalsSlice.reducer;
