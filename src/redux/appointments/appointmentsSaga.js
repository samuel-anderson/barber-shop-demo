import { takeLatest, all, put, call } from "redux-saga/effects";
import {
  fetchAppointmentsStart,
  fetchAppointmentsFailure,
  fetchAppointmentsSuccess,
  fetchBarberAppointmentsStart,
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

function* fetchBarberAppointmentsWorker({ payload }) {
  try {
    const appointments = yield call(
      firebaseService.getDocObject,
      "barber_shop",
      "appointments",
      payload
    );

    yield put(fetchAppointmentsSuccess(appointments[0].data));
  } catch (error) {
    yield put(fetchAppointmentsFailure(error.message));
  }
}

export function* onFetchAppointments() {
  yield takeLatest(fetchAppointmentsStart.type, fetchAppointmentsWorker);
}

export function* onFetchBarberAppointments() {
  yield takeLatest(
    fetchBarberAppointmentsStart.type,
    fetchBarberAppointmentsWorker
  );
}

export function* watchFetchAppointments() {
  yield all([call(onFetchAppointments), call(onFetchBarberAppointments)]);
}
