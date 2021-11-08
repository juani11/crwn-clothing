import { takeLatest, all, call, put } from "redux-saga/effects";
import UserActionTypes from "../user/user.types";
import { clearCart } from "./cart.actions";


export function* clearCartSignOut() {
    yield put(clearCart())
}

export function* onSignOutSucces() {
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartSignOut)
}

export function* cartSagas() {
    yield all([
        call(onSignOutSucces)
    ])
}