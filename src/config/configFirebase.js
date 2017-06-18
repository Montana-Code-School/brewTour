import firebase from 'firebase';

let config = {
  apiKey: "AIzaSyAKVhOleqXW-yl9bCzCcEvhno3z0quGCwE",
  authDomain: "brewtour-66745.firebaseapp.com",
  databaseURL: "https://brewtour-66745.firebaseio.com",
  projectId: "brewtour-66745",
  storageBucket: "brewtour-66745.appspot.com",
  messagingSenderId: "969813913995"
};
const firebaseApp = firebase.initializeApp(config);

export const db = firebaseApp.database();
export const auth = firebaseApp.auth();
export const storageKey = 'brew-login-mrwickpk'

export const isAuthenticated = () => {
  return auth.currentUser || localStorage.getItem(storageKey);
}
