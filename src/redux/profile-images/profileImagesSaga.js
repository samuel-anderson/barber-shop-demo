import { takeLatest, put, call } from "redux-saga/effects";

import { firebaseService } from "../../services";
import {
  fetchProfileImagesStart,
  fetchProfileImagesFailure,
  fetchProfileImagesSuccess,
} from "./profileImagesSlice";

function* fetchImageWorker(professionals) {
  try {
    const image_data = yield call(firebaseService.getStorage, professionals);

    yield put(fetchProfileImagesSuccess(image_data));
  } catch (error) {
    yield put(fetchProfileImagesFailure(error.message));
  }
}

export function* watchFetchProfileImages() {
  yield takeLatest(fetchProfileImagesStart.type, fetchImageWorker);
}
