import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAiBJRTKMbhLEWLG7nLC0XnBORC1g6A1xs',
  authDomain: 'roaddiaries-24a93.firebaseapp.com',
  databaseURL: 'https://roaddiaries-24a93.firebaseio.com',
  projectId: 'roaddiaries-24a93',
  //   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  storageBucket: 'roaddiaries-24a93.appspot.com',
  messagingSenderId: '974997947086',
  appId: '1:974997947086:web:ca48f8ecb9d7028178069f',
  measurementId: 'G-GKR2N1CP94'
};
firebase.initializeApp(firebaseConfig);
window.firebase = firebase;
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export const singInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();
export default firebase;
