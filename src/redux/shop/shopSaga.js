import { takeLatest, put, call } from "redux-saga/effects";
import {
  fetchShopDataStart,
  fetchShopDataSuccess,
  fetchShopDataFailure,
} from "./shopSlice";
import { fetchProfileImagesStart } from "../profile-images/profileImagesSlice";

import { setProfessionals } from "../professionals/professionalsSlice";
import { setServices } from "../services/servicesSlice";

import { firebaseService } from "../../services";
import {
  REACT_APP_FIREBASE_DB,
  REACT_APP_FIREBASE_SHOP_DOC,
  REACT_APP_FIREBASE_PROFESSIONALS_DOC,
  REACT_APP_FIREBASE_SERVICES_DOC,
} from "@env";

function* fetchShopWorker() {
  try {
    const shop_data = yield call(
      firebaseService.getCollection,
      REACT_APP_FIREBASE_DB
    );

    const shopInfo = shop_data.find((document) => {
      return document.id === REACT_APP_FIREBASE_SHOP_DOC;
    });
    yield put(fetchShopDataSuccess(shopInfo.data.items));

    const professionals = shop_data.find((document) => {
      return document.id === REACT_APP_FIREBASE_PROFESSIONALS_DOC;
    });

    const services = shop_data.find((document) => {
      return document.id === REACT_APP_FIREBASE_SERVICES_DOC;
    });

    const professionalArray = Object.values(professionals.data.items);

    yield put(setProfessionals(professionalArray));
    yield put(fetchProfileImagesStart(professionals.data.items));

    yield put(setServices(services.data.items));
  } catch (error) {
    yield put(fetchShopDataFailure(error.message));
  }
}

export function* watchFetchShop() {
  yield takeLatest(fetchShopDataStart.type, fetchShopWorker);
}
