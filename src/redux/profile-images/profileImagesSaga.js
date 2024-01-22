import { takeLatest, put, call } from "redux-saga/effects";

import { firebaseService } from "../../services";
import {
  fetchProfileImagesStart,
  fetchProfileImagesFailure,
  fetchProfileImagesSuccess,
} from "./profileImagesSlice";

function* fetchImageWorker({ payload }) {
  try {
    const professionals = Object.values(payload);
    const image_data = yield call(firebaseService.getStorage, professionals);

    yield put(fetchProfileImagesSuccess(image_data));
  } catch (error) {
    yield put(fetchProfileImagesFailure(error.message));
  }
}

export function* watchFetchProfileImages() {
  yield takeLatest(fetchProfileImagesStart.type, fetchImageWorker);
}
