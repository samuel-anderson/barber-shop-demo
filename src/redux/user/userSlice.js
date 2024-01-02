import { createSlice } from "@reduxjs/toolkit";

const USER_INITIAL_STATE = {
  currentUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: USER_INITIAL_STATE,
  reducers: {
    checkUserSession() {},
    signUpStart(state) {
      state.loading = true;
      state.error = null;
    },
    signUpSuccess(state) {
      state.loading = false;
      state.error = null;
    },
    signUpFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    signInStart(state) {
      state.loading = true;
      state.error = null;
    },
    signInSuccess(state, action) {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.currentUser = null;
    },
    signOutStart(state) {
      state.loading = true;
      state.error = null;
    },
    signOutSuccess(state, _) {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    signOutFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    userNotAuthicated(state, action) {
      state.currentUser = null;
    },
  },
});

export const {
  checkUserSession,
  signUpStart,
  signUpFailed,
  signInStart,
  signUpSuccess,
  signInFailed,
  signInSuccess,
  signOutFailed,
  signOutStart,
  signOutSuccess,
  userNotAuthicated,
} = userSlice.actions;
export default userSlice.reducer;
