import { all, call, put, takeEvery } from "redux-saga/effects";
import { convertCollectionsSnapshotToMap, firestore } from "../../firebase/firebase.utils";
import { fetchCollectionsFailure, fetchCollectionsSuccess } from "./shop.actions";

import ShopActionsTypes from "./shop.types";

function* fetchCollectionsAsync() {
    yield console.log("I am fired");
    try {
        const collectionRef = firestore.collection('collection');
        const querySnapshot = yield collectionRef.get()
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, querySnapshot)

        yield put(fetchCollectionsSuccess(collectionsMap));

    } catch (error) {
        yield put(fetchCollectionsFailure(error.message))
    }
}


export function* fetchCollectionsStart() {

    yield takeEvery(ShopActionsTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync)
}

export function* shopSagas() {
    yield all([
        call(fetchCollectionsStart)
    ])
}