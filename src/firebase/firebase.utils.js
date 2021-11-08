import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyBR0kCGfF3fG9Pi_9lnc3RxXmvQdH7VC-Q",
    authDomain: "crw-clothing-db-8a9bb.firebaseapp.com",
    projectId: "crw-clothing-db-8a9bb",
    storageBucket: "crw-clothing-db-8a9bb.appspot.com",
    messagingSenderId: "784087307869",
    appId: "1:784087307869:web:7fbcbe873059f587869fb4",
    measurementId: "G-SGT5XDVFP3"
};

export const createUserProfileDocument = async (userAuth, aditionalData) => {

    if (!userAuth) return

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            //Create user..
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...aditionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
}

export const convertCollectionsSnapshotToMap = collections => {

    const transformCollection = collections.docs.map(documentSnapshot => {
        const documentData = documentSnapshot.data();
        const { title, items } = documentData;

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: documentSnapshot.id,
            title,
            items
        }
    })

    return transformCollection.reduce((accumulator, curentCollection) => {
        accumulator[curentCollection.title.toLowerCase()] = curentCollection;
        return accumulator;
    }, {})
}

export const addCollectionAndDocument = async (collectionKey, objetsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objetsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });

    return await batch.commit();
}

firebase.initializeApp(config);

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject)
    })
}


export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

