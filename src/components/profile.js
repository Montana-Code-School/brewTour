import React from 'react';
import {auth, db} from '../config/configFirebase';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: auth.currentUser.displayName,
      userTours: auth.currentUser.tours
      //profilePic: auth.currentUser.profilePic
    };
  }

  render() {
    return(
      <div>
        <h1>Hello {this.state.userName}</h1>
        <div>

        </div>
      </div>
    );
  }
}
export default Profile;
