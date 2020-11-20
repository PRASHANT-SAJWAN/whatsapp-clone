import firebase from 'firebase';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAd0kvvRJ3DnmxWqMtRDLj8sjADc0_UF0s",
  authDomain: "whatsapp-clone-63b86.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-63b86.firebaseio.com",
  projectId: "whatsapp-clone-63b86",
  storageBucket: "whatsapp-clone-63b86.appspot.com",
  messagingSenderId: "215793506553",
  appId: "1:215793506553:web:7bf7ca60c6a6b5b7e2ea28",
  measurementId: "G-L9R7WDM1FL"
};

const firebaseApp = firebase.initializeApp (firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;
