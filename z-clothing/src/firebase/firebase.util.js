import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBRTTipcgNEUhRhxZ78ql_gh8MSsVyUEcI",
  authDomain: "z-clothing.firebaseapp.com",
  databaseURL: "https://z-clothing.firebaseio.com",
  projectId: "z-clothing",
  storageBucket: "z-clothing.appspot.com",
  messagingSenderId: "505301158678",
  appId: "1:505301158678:web:9f7c6c4271b9608a051e37",
  measurementId: "G-XTFS2F05VD"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  };
  return userRef;
}

   firebase.initializeApp(config);
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();

  provider.setCustomParameters({ prompt: 'select_account' });

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;