import { combineReducers } from "@reduxjs/toolkit";
import stepReducer from "./step/stepSlice";
import cartReducer from "./cart/cartSlice";
import shopReducer from "./shop/shopSlice";
import professionalReducer from "./professionals/professionalsSlice";
import serviceReducer from "./services/servicesSlice";
import appointementReducer from "./appointments/appointmentsSlice";
import smsReducer from "./sms/smsSlice";
import userReducer from "./user/userSlice";

const rootReducer = combineReducers({
  step: stepReducer,
  cart: cartReducer,
  shop: shopReducer,
  professionals: professionalReducer,
  services: serviceReducer,
  appointments: appointementReducer,
  sms: smsReducer,
  user: userReducer,
});

export default rootReducer;
