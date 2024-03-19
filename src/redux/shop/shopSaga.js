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
import { BARBER_SHOP_DATA } from "../../data";

function* fetchShopWorker() {
  try {
    const shop_data = yield call(
      firebaseService.getCollection,
      REACT_APP_FIREBASE_DB
    );

    if (shop_data.length === 0) {
      yield call(createShop);
    } else {
      yield call(parseCollection, shop_data);
    }
  } catch (error) {
    yield put(fetchShopDataFailure(error.message));
  }
}

function* createShop() {
  try {
    yield call(
      firebaseService.createDocument,
      REACT_APP_FIREBASE_DB,
      BARBER_SHOP_DATA
    );
    yield call(fetchShopWorker);
  } catch (e) {}
}

function* parseCollection(shop_data) {
  try {
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
  } catch (e) {}
}

export function* watchFetchShop() {
  yield takeLatest(fetchShopDataStart.type, fetchShopWorker);
}
