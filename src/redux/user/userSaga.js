import { takeLatest, all, put, call } from "redux-saga/effects";

import {
  createUserDocumentFromAuth,
  getCurrentUser,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser,
} from "../../util/firebase";
import {
  checkUserSession,
  signInFailed,
  signInStart,
  signInSuccess,
  signOutFailed,
  signOutStart,
  signOutSuccess,
  signUpFailed,
  signUpStart,
  signUpSuccess,
} from "./userSlice";

const ERRORS = {
  "auth/email-already-in-use": "*Email already has a registered account*",
  "auth/weak-password": "*Password should be at least 6 characters*",
  "auth/too-many-requests": "*Too many attempts*",
};

export function* getSnapshotFromUserAuth(userAuth) {
  try {
    const userSnapshot = yield call(createUserDocumentFromAuth, userAuth);
    yield put(
      signInSuccess({ id: userSnapshot.id, email: userSnapshot.data().email })
    );
  } catch (error) {
    yield put(signInFailed(error.code));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) {
      yield put(userNotAuthicated());
      return;
    }

    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFailed(error.code));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );

    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    console.log("Sign In Failed: ", error);

    yield put(signInFailed(error.code));
  }
}

export function* signUp({ payload: { email, password } }) {
  try {
    const { user } = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );

    yield put(signUpSuccess({ user }));
  } catch (error) {
    console.error("Sign Up Failed: ", error);

    yield put(
      signUpFailed(ERRORS[error.code] ? ERRORS[error.code] : error.code)
    );
  }
}

export function* signOut() {
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (error) {
    console.log("Sign Out Failed");

    yield put(signOutFailed(error.code));
  }
}

export function* signInAfterSignUp({ payload: { user } }) {
  yield call(getSnapshotFromUserAuth, user);
}

export function* onCheckUserSession() {
  yield takeLatest(checkUserSession.type, isUserAuthenticated);
}

export function* onSignUpStart() {
  yield takeLatest(signUpStart.type, signUp);
}
export function* onSignInStart() {
  yield takeLatest(signInStart.type, signInWithEmail);
}

export function* onSignUpSuccess() {
  yield takeLatest(signUpSuccess.type, signInAfterSignUp);
}

export function* onSignOutStart() {
  yield takeLatest(signOutStart.type, signOut);
}

export function* watchUserSagas() {
  yield all([
    call(onCheckUserSession),
    call(onSignUpStart),
    call(onSignInStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}
