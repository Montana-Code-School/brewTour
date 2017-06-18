import React from 'react';
import {auth, db} from '../config/configFirebase';



class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName:''
      //profilePic: auth.currentUser.profilePic
    };
  }

  getUser(userName) {
    console.log("inside getUser()")
    this.setState({
      userName: userName
    })

    console.log(userName);
  }


  componentDidMount() {
    db.ref('/users/' + window.localStorage['brew-login-mrwickpk']).on('value', function(snapshot) {
      console.log("hello");
      window.localStorage.setItem('userName', snapshot.val().displayName);

    });
    this.setState({
      userName:window.localStorage.userName
    })

  //   console.log(userName);

  //  var userName = db.ref('/users/' + auth.currentUser.uid).('value').then(function(snapshot) {
  //   return snapshot.val().displayName;
  //   console.log("I'm In db ref");
  //   console.log(snapshot.val().displayName);
  // });
  // this.getUser(userName);
  // console.log("outside");
  // console.log(this.state.userName);
}


  render() {
    return(
      <div>
        <h1>Hello {this.state.userName}</h1>
        <div>
          <h2>My Tours</h2>

        </div>
      </div>
    );
  }
}
export default Profile;
