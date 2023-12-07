import { createSlice } from "@reduxjs/toolkit";

const SHOP_INITIAL_STATE = {
  loading: false,
  error: null,
};

const shopSlice = createSlice({
  name: "shop",
  initialState: SHOP_INITIAL_STATE,
  reducers: {
    fetchShopDataStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchShopDataSuccess: (state) => {
      state.loading = false;
    },
    fetchShopDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchShopDataStart,
  fetchShopDataSuccess,
  fetchShopDataFailure,
} = shopSlice.actions;
export default shopSlice.reducer;
