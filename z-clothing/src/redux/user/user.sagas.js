import { takeEvery, all, call, put } from "redux-saga/effects";
import UserActionTypes from "./user.types";

import {
  auth,
  googleProvider,
  createUserProfileDocument,
} from "../../firebase/firebase.utils";
import { signInSuccess, signInFailure } from "./user.actions";

export function* googleSignIn() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    const userRef = yield call(createUserProfileDocument, user);
    const snapShot = yield userRef.get();
    yield put(signInSuccess({ id: snapShot.id, ...snapShot.data() }));
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}

export function* onGoogleSignInStart() {
  yield takeEvery(UserActionTypes.GOOGLE_SIGN_IN_START, googleSignIn);
}

export function* userSaga() {
  yield all([call(onGoogleSignInStart)]);
}
