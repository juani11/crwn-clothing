import { convertCollectionsSnapshotToMap, firestore } from "../../firebase/firebase.utils";
import ShopActionsTypes from "./shop.types";


export const fetchCollectionsStart = () => ({
    type: ShopActionsTypes.FETCH_COLLECTIONS_START
})

export const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionsTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
})

export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionsTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
})


export const fetchCollectionsStartAsync = () => {
    return dispatch => {

        const collectionRef = firestore.collection('collection');

        dispatch(fetchCollectionsStart());

        collectionRef.get()
            .then(querySnapshot => {
                const collectionsMap = convertCollectionsSnapshotToMap(querySnapshot);
                dispatch(fetchCollectionsSuccess(collectionsMap));
            })
            .catch(error => {
                dispatch(fetchCollectionsFailure(error.message))
            })
    }
}