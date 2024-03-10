import { createSlice } from "@reduxjs/toolkit";

const APPOINTMENTS_INITIAL_STATE = {
  appointments: null,
};

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState: APPOINTMENTS_INITIAL_STATE,
  reducers: {
    fetchBarberAppointmentsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
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
    editAppointmentStart(state) {
      state.loading = true;
      state.error = null;
    },
    editAppointmentSuccess(state, _) {
      state.loading = false;
      state.error = null;
    },
    editAppointmentFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    rescheduleAppointmentStart(state) {
      state.loading = true;
      state.error = null;
    },
    rescheduleAppointmentSuccess(state, _) {
      state.loading = false;
      state.error = null;
    },
    rescheduleAppointmentFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchAppointmentsStart,
  fetchAppointmentsSuccess,
  fetchAppointmentsFailure,
  fetchBarberAppointmentsStart,
  editAppointmentStart,
  editAppointmentSuccess,
  editAppointmentFailed,
  rescheduleAppointmentFailed,
  rescheduleAppointmentStart,
  rescheduleAppointmentSuccess,
} = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
