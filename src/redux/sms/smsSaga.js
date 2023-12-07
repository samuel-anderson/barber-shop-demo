import { takeLatest, put, call } from "redux-saga/effects";
import { sendSMSStart, sendSMSSuccess, sendSMSFailure } from "./smsSlice";
import { setIsCartFinished } from "../cart/cartSlice";

import { smsService } from "../../services";

function* sendSMSWorker(action) {
  try {
    const { cart, clientInfo } = action.payload;
    const { success } = yield call(smsService.submitBooking, cart, clientInfo);

    if (success) {
      yield put(sendSMSSuccess());
      yield put(setIsCartFinished(success));
    } else yield put(sendSMSFailure("Trouble with sending SMS to Barber."));
  } catch (error) {
    yield put(sendSMSFailure(error.message));
  }
}

export function* watchSendSMS() {
  yield takeLatest(sendSMSStart.type, sendSMSWorker);
}
