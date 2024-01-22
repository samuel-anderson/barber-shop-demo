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

function* fetchShopWorker() {
  try {
    const shop_data = yield call(firebaseService.getCollection, "barber_shop");

    const shopInfo = shop_data.find((document) => {
      return document.id === "shop";
    });
    yield put(fetchShopDataSuccess(shopInfo.data.items));

    const professionals = shop_data.find((document) => {
      return document.id === "professionals";
    });

    const services = shop_data.find((document) => {
      return document.id === "services";
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
