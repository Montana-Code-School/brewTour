import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {auth, db, storagePic} from '../config/configFirebase';
import TextField from './text-field';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      confirm: '',
      displayName: '',
      profilePic: '',
      uploadTask: '',
      profileImg: '',
      showErrors: false,
      loggedIn: false
    };

  this.storageRef = storagePic.ref('/user-images');
}

  handleChange = (evt) => {
    let file = evt.target.files[0];
    console.log(file);
    this.state.profileImg = file;
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    this.setState({showErrors:true});

    if (this.validateForm()) {

      auth.createUserWithEmailAndPassword(this.state.email, this.state.password).then(user => {  //Sets up Firebase Authentication & saves to database
        db.ref().child('users').child(user.uid).set({
          email: user.email,
          displayName: this.state.displayName,
          profileImg: this.state.profileImg
        })


        this.storageRef.child(this.state.profileImg.name).put(this.state.profileImg).then((snapshot) => { //Adds profile picture
          db.ref().child('users').child(auth.currentUser.uid).child('photoURL').set(snapshot.downloadURL);
        }).catch(err => alert(err.message));

        user.updateProfile({
          displayName: this.state.displayName,
          profileImg: this.state.profileImg
          // profilePic: this.state.profilePic
        });

  }).catch(err => alert(err.message));
        this.setState({loggedIn: true});
      }
    }

  validateForm() {
    return(
      this.state.email.length > 0 &&
      this.state.displayName.length > 0 &&
      this.state.password.length >= 6 &&
      this.state.password === this.state.confirm
    );
  }

  render() {
    const {showErrors, loggedIn} = this.state;
    return (
      <main className="loginBkgd">
        {loggedIn && (
          <Redirect to = '/brewerysearch'/>
        )}
        <div className="registerContainer">
          <img src="img/logo.png" />
          <form onSubmit={this.handleSubmit.bind(this)}>
            <TextField
              className="generalInputs"
              value={this.state.email}
              label='Email'
              errorText = 'Email Is Required'
              showError = {showErrors && this.state.email.length <= 0}
              onFieldChanged={e => this.setState({email:e.target.value})}
            />
            <TextField
              className="generalInputs"
              value={this.state.displayName}
              label='Display Name'
              errorText = 'Display Name Is Required'
              showError = {showErrors && this.state.displayName.length <= 0}
              onFieldChanged={e => this.setState({displayName:e.target.value})}
            />
            <h4>Profile Picture</h4>
            <input
              className="generalInputs"
              size="100"
              type="file"
              name="files[]"
              onChange={(event)=> {
               this.handleChange(event)}}
              label="Profile Picture"
              multiple
            />
            <TextField
              className="generalInputs"
              value={this.state.password}
              label='Password'
              errorText = 'Password Is Required'
              showError = {showErrors && this.state.password.length <= 0}
              onFieldChanged={e => this.setState({password:e.target.value})}
              type='password'
            />
            <TextField
              className="generalInputs"
              value={this.state.confirm}
              label='Confirm Password'
              errorText = 'Passwords Must Match'
              showError = {showErrors && this.state.password !== this.state.confirm}
              onFieldChanged={e => this.setState({confirm:e.target.value})}
              type='password'
            />
            <div className="loginBtns">
              <button type='submit'>Register</button>
              <Link to='/'><button>Log In</button></Link>
            </div>
          </form>
          {console.log(this.state.profilePic)}
        </div>
      </main>
    );
  }
}

export default Register;
