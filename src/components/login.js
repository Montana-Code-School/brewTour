import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {auth} from '../config/configFirebase';
import TextField from './text-field';
import PropTypes from 'prop-types';
import {Expo,TweenMax, Power2, TimelineMax, Elastic} from 'gsap';
import GSAP from 'react-gsap-enhancer';


class Login extends React.Component {
  static propTypes = {
    location: PropTypes.object
  };

  state = {
    email:"",
    password:"",
    redirectToReferrer: false,
    showErrors: false
  };

  componentDidMount() {
    const LoginBounce = new TimelineMax();
    LoginBounce.fromTo('.loginContainer', 1.8, {y: -700}, {ease: Elastic.easeInOut, y: 0},0)
    .fromTo('.generalInputs', 1.8, {y: -700}, {ease: Elastic.easeInOut, y: 0},'-=1.8')
    .fromTo('#image', 1.8, {y: -700}, {ease: Elastic.easeInOut, y: 0},'-=1.8')
    .fromTo('.loginBtns', 1.8, {y: -700}, {ease: Elastic.easeInOut, y: 0},'-=1.8');

  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({showErrors:true})
    if (this.validateForm()) {
      auth.signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
        this.setState({redirectToReferrer:true});
      }).catch(error => (console.error(error)));
    }
  }

  validateForm = () => {
    return (
      this.state.email.includes('@') && this.state.password.length > 0
    );
  }

  render () {
    const {from} = '/';
    const {redirectToReferrer, showErrors} = this.state;

    return (
      <main className="loginBkgd">
        {redirectToReferrer && (
          <Redirect to={from || '/brewerysearch'} />
        )}
        {from && (
          <p>You must log in to view page at <code>{from.pathname}</code></p>
        )}
        <div className="loginContainer">
        <img id="image" src='img/logo.png' />

          <form onSubmit={this.handleSubmit}>
            <TextField
              className="generalInputs"
              value={this.state.email}
              label="Email"
              errorText="Email is required"
              showError={showErrors && this.state.email.length <= 0}
              onFieldChanged={e => this.setState({email: e.target.value})}
              />

            <TextField
              className="generalInputs"
              value={this.state.password}
              label="password"
              errorText="password is required"
              showError={showErrors && this.state.password.length <= 0}
              onFieldChanged={e => this.setState({password: e.target.value})}
              type="password"
              />
              <div className="loginBtns">
              <button type="submit">Sign In</button>
              <Link to="/register"><button>Create Account</button></Link>
              </div>
          </form>
        </div>
      </main>
    );
  }
}

export default Login;
