import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {auth} from '../config/configFirebase';
import TextField from './text-field';
import PropTypes from 'prop-types';

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
      <main>
        {redirectToReferrer && (
          <Redirect to={from || '/brewerysearch'} />
        )}
        {from && (
          <p>You must log in to view page at <code>{from.pathname}</code></p>
        )}
        <div>
          <form onSubmit={this.handleSubmit}>
            <TextField
              value={this.state.email}
              label="Email"
              errorText="Email is required"
              showError={showErrors && this.state.email.length <= 0}
              onFieldChanged={e => this.setState({email: e.target.value})}
              />

            <TextField
              value={this.state.password}
              label="password"
              errorText="password is required"
              showError={showErrors && this.state.password.length <= 0}
              onFieldChanged={e => this.setState({password: e.target.value})}
              type="password"
              />

              <button type="submit">Sign In</button>
              or <Link to="/register">Create Account</Link>
          </form>
        </div>
      </main>
    );
  }
}

export default Login;
