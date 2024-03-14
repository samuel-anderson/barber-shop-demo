import { all, call } from "redux-saga/effects";

import { watchFetchShop } from "./shop/shopSaga";
import { watchFetchAppointments } from "./appointments/appointmentsSaga";
import { watchSendSMS } from "./sms/smsSaga";
import { watchUserSagas } from "./user/userSaga";
import { watchFetchProfileImages } from "./profile-images/profileImagesSaga";
import { watchFetchBarbers } from "./professionals/professionasSaga";

export default function* rootSaga() {
  yield all([
    call(watchFetchShop),
    call(watchFetchAppointments),
    call(watchSendSMS),
    call(watchUserSagas),
    call(watchFetchProfileImages),
    call(watchFetchBarbers),
  ]);
}
