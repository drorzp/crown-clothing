import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const config = {
  apiKey: 'AIzaSyAGOqA1PtfzNPp2IBlzknfoAFKWfwcLQcE',
  authDomain: 'crown-db-e01ba.firebaseapp.com',
  projectId: 'crown-db-e01ba',
  storageBucket: 'crown-db-e01ba.appspot.com',
  messagingSenderId: '624766852254',
  appId: '1:624766852254:web:3361da612f80a205c1ef8f',
  measurementId: 'G-HSF6HGRF3V',
};

export const createUserProfileDocument = async (
  userAuth,
  ...additionalData
) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        email,
        createdAt,
        ...additionalData,
      });
    } catch (err) {
      console.log('error creating user ', err.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
