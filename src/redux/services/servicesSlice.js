import { createSlice } from "@reduxjs/toolkit";

const SERVICES_INITIAL_STATE = {
  services: [],
};

const servicesSlice = createSlice({
  name: "services",
  initialState: SERVICES_INITIAL_STATE,
  reducers: {
    setServices: (state, action) => {
      state.services = action.payload;
    },
  },
});

export const { setServices } = servicesSlice.actions;
export default servicesSlice.reducer;
