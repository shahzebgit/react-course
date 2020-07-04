import { all, call, put, takeLatest } from "redux-saga/effects";
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
    yield getUserInfo(user)
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getUserInfo(user)
  } catch (error) {
    put(signInFailure(error.message));
  }
}

export function* getUserInfo(user){
  const userRef = yield call(createUserProfileDocument, user);
    const snapShot = yield userRef.get();
    yield put(signInSuccess({ id: snapShot.id, ...snapShot.data() })); 
}
export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, googleSignIn);
}

export function* userSaga() {
  yield all([call(onGoogleSignInStart), call(onEmailSignInStart)]);
}
