import { createSlice } from "@reduxjs/toolkit";

const APPOINTMENTS_INITIAL_STATE = {
  appointments: null,
  barberAppointments: null,
  dates: null,
  selectedDate: null,
  selectedAppointment: null,
  error: null,
  loading: null,
  filterSuccess: false,
  barberAptsLoading: false,
};

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState: APPOINTMENTS_INITIAL_STATE,
  reducers: {
    emptyAppointments: (_) => APPOINTMENTS_INITIAL_STATE,
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    setSelectedAppointment: (state, action) => {
      state.selectedAppointment = action.payload;
    },
    fetchBarberAppointmentsStart: (state) => {
      state.barberAptsLoading = true;
      state.error = null;
      state.filterSuccess = false;
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
      const apts = action.payload;
      state.barberAptsLoading = false;
      state.barberAppointments = apts;
      state.dates = Object.keys(apts).filter((date) => apts[date].length > 0);
    },
    fetchBarberAppointmentsFailure: (state, action) => {
      state.barberAptsLoading = false;
      state.error = action.payload;
    },
    fetchAppointmentsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    filterAppointmentStart(state) {
      state.loading = true;
      state.error = null;
      state.filterSuccess = false;
    },
    filterAppointmentSuccess(state) {
      state.filterSuccess = true;
    },
    filterAppointmentFailure(state) {
      state.filterSuccess = false;
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
  filterAppointmentStart,
  filterAppointmentSuccess,
  filterAppointmentFailure,
  emptyAppointments,
} = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
