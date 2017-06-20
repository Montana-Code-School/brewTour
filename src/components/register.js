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
  this.handleSubmit = this.handleSubmit.bind(this);
}

  handleChange = (evt) => {
    let file = evt.target.files[0];
    console.log(file);
    this.state.profileImg = file;
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const uploadTask = this.storageRef.child(this.state.profileImg.name).put(this.state.profileImg);
    uploadTask.then((snapshot) => {
      db.ref().child('users').child(auth.currentUser.uid).child('photoURL').set(snapshot.downloadURL);
    });


    this.setState({showErrors:true});
    if (this.validateForm()) {
      auth.createUserWithEmailAndPassword(this.state.email, this.state.password).then(user => {
        db.ref().child('users').child(user.uid).set({
          email: user.email,
          displayName: this.state.displayName,
          profileImg: this.state.profileImg
        });
        user.updateProfile({
          displayName: this.state.displayName,
          profileImg: this.state.profileImg
          // profilePic: this.state.profilePic
        });
        this.setState({loggedIn: true});
      }).catch(error => console.error(error));
    }
  }

  validateForm = () => {
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
      <main>
        {loggedIn && (
          <Redirect to = '/brewerysearch'/>
        )}
        <div>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <TextField
              value={this.state.email}
              label='Email'
              errorText = 'Email Is Required'
              showError = {showErrors && this.state.email.length <= 0}
              onFieldChanged={e => this.setState({email:e.target.value})}
            />
            <TextField
              value={this.state.displayName}
              label='Display Name'
              errorText = 'Display Name Is Required'
              showError = {showErrors && this.state.displayName.length <= 0}
              onFieldChanged={e => this.setState({displayName:e.target.value})}
            />
            <h4>Profile Picture</h4>
            <input
              type="file"
              name="files[]"
              onChange={(event)=> {
               this.handleChange(event)}}
              label="Profile Picture"
              multiple
            />
            <TextField
              value={this.state.password}
              label='Password'
              errorText = 'Password Is Required'
              showError = {showErrors && this.state.password.length <= 0}
              onFieldChanged={e => this.setState({password:e.target.value})}
              type='password'
            />
            <TextField
              value={this.state.confirm}
              label='Confirm Password'
              errorText = 'Passwords Must Match'
              showError = {showErrors && this.state.password !== this.state.confirm}
              onFieldChanged={e => this.setState({confirm:e.target.value})}
              type='password'
            />
            <button type='submit'>Register</button>
            Or <Link to='/'>Log In</Link>
          </form>
          {console.log(this.state.profilePic)}
        </div>
      </main>
    );
  }
}

export default Register;
