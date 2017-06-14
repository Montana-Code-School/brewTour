import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import * as firebase from 'firebase';
import BrewerySearch from './components/BrewerySearch';

// Initialize Firebase
 var config = {
   apiKey: "AIzaSyAKVhOleqXW-yl9bCzCcEvhno3z0quGCwE",
   authDomain: "brewtour-66745.firebaseapp.com",
   databaseURL: "https://brewtour-66745.firebaseio.com",
   projectId: "brewtour-66745",
   storageBucket: "brewtour-66745.appspot.com",
   messagingSenderId: "969813913995"
 };
firebase.initializeApp(config);

const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');
const btnSignUp = document.getElementById('btnSignUp');
const btnLogout = document.getElementById('btnLogout');

btnLogin.addEventListener('click', e => {
  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();

  const promise = auth.signInWithEmailAndPassword(email, pass);
  promise.catch(e => console.log(e.message));
});

btnSignUp.addEventListener('click', e => {
  //TODO: Check for real email
  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();

  const promise = auth.createUserWithEmailAndPassword(email, pass);

  promise
         .catch(e => console.log(e.message));
});

btnLogout.addEventListener('click', e => {
  firebase.auth().signOut();
});

  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
      console.log("yopur logged in bitchhhhhhh");
      ReactDOM.render(<BrewerySearch />, document.getElementById('root'));
      btnLogout.classList.remove('hide');
    } else {
      ReactDOM.render(<App />, document.getElementById('root'));
      console.log('not logged in');
      btnLogout.classList.add('hide');
    }

});




registerServiceWorker();
