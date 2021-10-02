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




firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

