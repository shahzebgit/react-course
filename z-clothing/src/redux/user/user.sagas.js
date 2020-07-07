import { all, call, put, takeLatest } from "redux-saga/effects";
import UserActionTypes from "./user.types";

import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser,
} from "../../firebase/firebase.utils";
import { signInSuccess, signInFailure,signOutFailure,signOutSuccess,signUpFailure,signUpSuccess} from "./user.actions";

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

export function* signUp({payload:{email,password,displayName}}){
  try{
      const {user} = yield auth.createUserWithEmailAndPassword(email,password)
    
      yield put(signUpSuccess({user,additionalData:{displayName}}))
    }catch(error){
    yield put(signUpFailure(error))
  }
} 

export function* afterSignUp({payload:{user,additionalData}}){
  yield getUserInfo(user,additionalData)
}

export function* getUserInfo(userAuth,additionalData) {
  const userRef = yield call(createUserProfileDocument, userAuth,additionalData);
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

export function* onSignUp(){
  yield takeLatest(UserActionTypes.SIGN_UP_START,signUp)
}

export function* onSignUpSuccess(){
yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS,afterSignUp)
}

export function* userSaga() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(isUserAuthenticated),
    call(onSignOut),
    call(onSignUp),
    call(onSignUpSuccess)
  ]);
}
