import { all, call } from "redux-saga/effects";

import { watchFetchShop } from "./shop/shopSaga";
import { watchFetchAppointments } from "./appointments/appointmentsSaga";
import { watchSendSMS } from "./sms/smsSaga";
import { watchUserSagas } from "./user/userSaga";

export default function* rootSaga() {
  yield all([
    call(watchFetchShop),
    call(watchFetchAppointments),
    call(watchSendSMS),
    call(watchUserSagas),
  ]);
}
