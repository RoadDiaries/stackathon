import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
// import '../secrets';

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: 'roaddiaries-24a93',
  //   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  storageBucket: 'roaddiaries-24a93.appspot.com',
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};
firebase.initializeApp(firebaseConfig);
window.firebase = firebase;
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export default firebase;
