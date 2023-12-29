import { createSlice } from "@reduxjs/toolkit";

const PROFILE_IMAGES_INITIAL_STATE = {
  loading: false,
  error: null,
  profileImages: [],
};

const profileImagesSlice = createSlice({
  name: "profileImages",
  initialState: PROFILE_IMAGES_INITIAL_STATE,
  reducers: {
    fetchProfileImagesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProfileImagesSuccess: (state, action) => {
      state.loading = false;
      state.profileImages = action.payload;
    },
    fetchProfileImagesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchProfileImagesStart,
  fetchProfileImagesSuccess,
  fetchProfileImagesFailure,
} = profileImagesSlice.actions;
export default profileImagesSlice.reducer;
