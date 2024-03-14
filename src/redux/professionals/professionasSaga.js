import { takeLatest, all, put, call } from "redux-saga/effects";

import { insertBarber } from "../../services/sms/smsService";
import {
  addBarberFailure,
  addBarberStart,
  addBarberSuccess,
  fetchBarbersStart,
} from "./professionalsSlice";
import { firebaseService } from "../../services";

function* fetchBarberWorker() {
  try {
    const barbers = yield call(
      firebaseService.getCollection,
      "barber_shop",
      "professionals"
    );
    yield put(fetchBarberSuccess(barbers[0].data.items));
  } catch (error) {
    yield put(fetchBarberFailure(error.message));
  }
}

export function* addBarber({ payload }) {
  try {
    yield call(insertBarber, payload.barberInfo.id, payload.barberInfo);
    yield call(addBarberSuccess());
    yield call(fetchBarbersStart());
  } catch (error) {
    yield put(addBarberFailure(error.code));
  }
}

export function* onFetchBarbers() {
  yield takeLatest(fetchBarbersStart.type, fetchBarberWorker);
}

export function* onAddBarberStart() {
  yield takeLatest(addBarberStart.type, addBarber);
}

export function* watchFetchBarbers() {
  yield all([call(onAddBarberStart), call(onFetchBarbers)]);
}
