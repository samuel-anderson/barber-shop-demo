import { takeLatest, put, call } from "redux-saga/effects";
import {
  fetchServicesStart,
  fetchServicesSuccess,
  fetchServicesFailure,
} from "./servicesSlice";
import { firebaseService } from "../../services";
import { REACT_APP_FIREBASE_DB, REACT_APP_FIREBASE_SERVICES_DOC } from "@env";

function* fetchServicesWorker() {
  try {
    const services = yield call(
      firebaseService.getCollection,
      REACT_APP_FIREBASE_DB,
      REACT_APP_FIREBASE_SERVICES_DOC
    );
    yield put(fetchServicesSuccess(services));
  } catch (error) {
    yield put(fetchServicesFailure(error.message));
  }
}

export function* watchFetchServices() {
  yield takeLatest(fetchServicesStart.type, fetchServicesWorker);
}
