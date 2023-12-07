import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const CART_INITIAL_STATE = {
  isFinished: false,
  professional: null,
  service: null,
  addOns: [],
  serviceDate: moment().format("YYYY-MM-DD"),
  startTime: null,
  endTime: null,
  estimatedDuration: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: CART_INITIAL_STATE,
  reducers: {
    emptyCart: (_) => CART_INITIAL_STATE,
    setIsCartFinished: (state, action) => {
      state.isFinished = action.payload;
    },
    setProfessional: (state, action) => {
      state.professional = action.payload.professional;
    },
    addService: (state, action) => {
      state.service = action.payload.service;
    },
    removeService: (state) => {
      state.service = null;
    },
    addAddOn: (state, action) => {
      const addExists = state.addOns.some(
        (service) => action.payload.addOn.id === service.id
      );

      if (!addExists) state.addOns = [...state.addOns, action.payload.addOn];
    },
    removeAddOn: (state, action) => {
      state.addOns = state.addOns.filter(
        (addOn) => addOn.id !== action.payload.addOn.id
      );
    },
    removeAddOns: (state) => {
      state.addOns = [];
    },
    setServiceDate: (state, action) => {
      state.serviceDate = action.payload;
    },
    setEstimatedDuration: (state, action) => {
      state.estimatedDuration = action.payload;
    },
    setStartTime: (state, action) => {
      state.startTime = action.payload;

      state.endTime = moment(state.startTime, "h:mm A")
        .add(state.estimatedDuration, "minutes")
        .format("h:mm A");
    },
  },
});

export const {
  emptyCart,
  setIsCartFinished,
  setProfessional,
  addService,
  removeService,
  addAddOn,
  removeAddOn,
  removeAddOns,
  setServiceDate,
  setEstimatedDuration,
  setStartTime,
} = cartSlice.actions;
export default cartSlice.reducer;
