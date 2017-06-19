import React from 'react';
import {auth, db} from '../config/configFirebase';
import Logout from './Logout';
import DisplayBreweries from "./DisplayBreweries";





class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName:'',
      myTours: '',
      tourNames:[]
      //profilePic: auth.currentUser.profilePic
    };
  }



  componentDidMount() {
    db.ref('/users/' + window.localStorage['brew-login-mrwickpk']).on('value', function(snapshot) {
      window.localStorage.setItem('userName', snapshot.val().displayName);
      window.localStorage.setItem('myTours', JSON.stringify(snapshot.val().tours));
    });
    const mainObj = JSON.parse(window.localStorage.getItem('myTours'));
    const tourNames = Object.keys(mainObj);
    console.log(mainObj);

    this.setState({
      userName: window.localStorage.userName,
      mainObj: mainObj,
      tourNames: tourNames
    })
}



  render() {
    return(
      <div>
       <Logout />
        <h1>Hello {this.state.userName}</h1>
        <div>
          <h2>My Tours</h2>
          <ul>
            {this.state.tourNames.map(tourName => {
              return(
              <DisplayBreweries breweryArr={this.state.mainObj[tourName]} tourName={tourName}/>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
export default Profile;
