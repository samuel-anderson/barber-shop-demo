import { createSlice } from "@reduxjs/toolkit";

const SMS_INITIAL_STATE = {
  loading: false,
  error: null,
};

const smsSlice = createSlice({
  name: "sms",
  initialState: SMS_INITIAL_STATE,
  reducers: {
    sendSMSStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    sendSMSSuccess: (state) => {
      state.loading = false;
    },
    sendSMSFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { sendSMSStart, sendSMSSuccess, sendSMSFailure } =
  smsSlice.actions;
export default smsSlice.reducer;
