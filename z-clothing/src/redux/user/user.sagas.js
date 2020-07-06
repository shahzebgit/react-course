import { all, call, put, takeLatest } from "redux-saga/effects";
import UserActionTypes from "./user.types";

import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser,
} from "../../firebase/firebase.utils";
import { signInSuccess, signInFailure,signOutFailure,signOutSuccess } from "./user.actions";

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getUserInfo(userAuth);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* googleSignIn() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getUserInfo(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getUserInfo(user);
  } catch (error) {
    put(signInFailure(error));
  }
}

export function* isUserSignOut(){
  try{
    yield auth.signOut();
    yield put(signOutSuccess())
  }catch(error){
    yield put(signOutFailure(error))
  }
}

export function* getUserInfo(user) {
  const userRef = yield call(createUserProfileDocument, user);
  const snapShot = yield userRef.get();
  yield put(signInSuccess({ id: snapShot.id, ...snapShot.data() }));
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, googleSignIn);
}

export function* onSignOut(){
  yield takeLatest(UserActionTypes.SIGN_OUT_START,isUserSignOut);
}

export function* userSaga() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(isUserAuthenticated),
    call(onSignOut),
  ]);
}
