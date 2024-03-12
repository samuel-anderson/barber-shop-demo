import { createSlice } from "@reduxjs/toolkit";

const APPOINTMENTS_INITIAL_STATE = {
  appointments: null,
  barberAppointments: null,
  dates: null,
  selectedDate: null,
  selectedAppointment: null,
  error: null,
  loading: null,
};

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState: APPOINTMENTS_INITIAL_STATE,
  reducers: {
    empty: (_) => APPOINTMENTS_INITIAL_STATE,
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    setSelectedAppointment: (state, action) => {
      state.selectedAppointment = action.payload;
    },
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
    fetchBarberAppointmentsSuccess: (state, action) => {
      state.loading = false;
      state.barberAppointments = action.payload;
      state.dates = Object.keys(action.payload);
    },
    fetchBarberAppointmentsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
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
  },
});

export const {
  fetchAppointmentsStart,
  fetchAppointmentsSuccess,
  fetchAppointmentsFailure,
  fetchBarberAppointmentsStart,
  fetchBarberAppointmentsFailure,
  fetchBarberAppointmentsSuccess,
  editAppointmentStart,
  editAppointmentSuccess,
  editAppointmentFailed,
  setSelectedDate,
  setSelectedAppointment,
} = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
