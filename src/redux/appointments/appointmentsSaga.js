import { takeLatest, all, put, call } from "redux-saga/effects";
import {
  fetchAppointmentsStart,
  fetchAppointmentsFailure,
  fetchAppointmentsSuccess,
  fetchBarberAppointmentsStart,
  editAppointmentStart,
  editAppointmentFailed,
  editAppointmentSuccess,
  fetchBarberAppointmentsSuccess,
  fetchBarberAppointmentsFailure,
  filterAppointmentStart,
  filterAppointmentSuccess,
  filterAppointmentFailure,
} from "./appointmentsSlice";

import { firebaseService } from "../../services";
import {
  updateAppointmentDoc,
  filterAppointmentDoc,
} from "../../services/firebase/firebaseService";
import { insertBooking } from "../../services/sms/smsService";
import {
  REACT_APP_FIREBASE_DB,
  REACT_APP_FIREBASE_APPOINTMENTS_DOC,
} from "@env";

function* fetchAppointmentsWorker() {
  try {
    const appointments = yield call(
      firebaseService.getCollection,
      REACT_APP_FIREBASE_DB,
      REACT_APP_FIREBASE_APPOINTMENTS_DOC
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
      REACT_APP_FIREBASE_DB,
      REACT_APP_FIREBASE_APPOINTMENTS_DOC,
      payload
    );
    yield put(fetchBarberAppointmentsSuccess(appointments[0].data));
  } catch (error) {
    yield put(fetchBarberAppointmentsFailure(error.message));
  }
}

export function* editAppointment({ payload }) {
  try {
    yield call(
      updateAppointmentDoc,
      REACT_APP_FIREBASE_DB,
      REACT_APP_FIREBASE_APPOINTMENTS_DOC,
      payload
    );
    yield put(editAppointmentSuccess());
    yield put(fetchShopDataStart());
  } catch (error) {
    yield put(editAppointmentFailed(error.code));
  }
}

export function* filterAppointment({ payload }) {
  try {
    yield call(
      filterAppointmentDoc,
      REACT_APP_FIREBASE_DB,
      REACT_APP_FIREBASE_APPOINTMENTS_DOC,
      payload
    );

    yield call(insertBooking, payload.cart, payload.clientInfo, "rescheduled");
    yield call(fetchBarberAppointmentsWorker, payload.barberId);
    yield put(filterAppointmentSuccess());
  } catch (error) {
    yield put(filterAppointmentFailure(error.code));
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

export function* onEditAppointmentStart() {
  yield takeLatest(editAppointmentStart.type, editAppointment);
}

export function* onFilterAppointmentStart() {
  yield takeLatest(filterAppointmentStart.type, filterAppointment);
}

export function* watchFetchAppointments() {
  yield all([
    call(onFetchAppointments),
    call(onFetchBarberAppointments),
    call(onEditAppointmentStart),
    call(onFilterAppointmentStart),
  ]);
}
