import { all,call,put,takeLatest} from 'redux-saga/effects';

import UserActionTypes from '../user/user.types'
import {clearCart} from '../cart/cart.actions'


export function* clearCartItems(){
    yield put(clearCart())
}

export function* onSignOutSuccess(){
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS,clearCartItems)
}

export function* cartSaga(){
    yield all([call(onSignOutSuccess)])
}