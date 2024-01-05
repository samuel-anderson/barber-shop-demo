import { takeLatest, put, call } from "redux-saga/effects";
import {
  fetchAppointmentsStart,
  fetchAppointmentsFailure,
  fetchAppointmentsSuccess,
} from "./appointmentsSlice";

import { firebaseService } from "../../services";

function* fetchAppointmentsWorker() {
  try {
    const appointments = yield call(
      firebaseService.getCollection,
      "barber_shop",
      "appointments"
    );

    yield put(fetchAppointmentsSuccess(appointments[0].data.items));
  } catch (error) {
    yield put(fetchAppointmentsFailure(error.message));
  }
}

export function* watchFetchAppointments() {
  yield takeLatest(fetchAppointmentsStart.type, fetchAppointmentsWorker);
}
