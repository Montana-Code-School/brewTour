import React from 'react';
import {auth, db} from '../config/configFirebase';
import {Link, Redirect} from 'react-router-dom';

class Logout extends React.Component {

  handleLogout() {
    auth.signOut();
  }

  render() {
    return(
      <Link to="/" onClick={this.handleLogout.bind(this)}>Log Out</Link>
    );
  }
}

export default Logout;
