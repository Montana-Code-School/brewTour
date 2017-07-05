import firebase from 'firebase';

let config = {
 //paste firebase config here
};
const firebaseApp = firebase.initializeApp(config);

export const db = firebaseApp.database();
export const auth = firebaseApp.auth();
export const storageKey = 'brew-login-mrwickpk'

export const isAuthenticated = () => {
  return !!auth.currentUser || !!localStorage.getItem(storageKey);
}
