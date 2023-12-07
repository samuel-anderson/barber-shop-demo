import { createSlice } from "@reduxjs/toolkit";

const APPOINTMENTS_INITIAL_STATE = {
  appointments: [],
};

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState: APPOINTMENTS_INITIAL_STATE,
  reducers: {
    fetchAppointmentsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAppointmentsSuccess: (state, action) => {
      state.loading = false;
      state.appointments = action.payload;
    },
    fetchAppointmentsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchAppointmentsStart,
  fetchAppointmentsSuccess,
  fetchAppointmentsFailure,
} = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
