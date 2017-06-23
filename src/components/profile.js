import React from 'react';
import {auth, db} from '../config/configFirebase';
import Logout from './Logout';
import DisplayBreweries from "./DisplayBreweries";
import NavBar from './NavBar';
import Footer from './Footer';



class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName:'',
      myTours: '',
      tourNames:[],
      mainObj: '',
      profileImg: ''
      //profilePic: auth.currentUser.profilePic
    };
  }

  componentDidMount() {
    db.ref('/users/' + window.localStorage['brew-login-mrwickpk']).on('value', function(snapshot) {
      window.localStorage.setItem('userName', snapshot.val().displayName);
      window.localStorage.setItem('profileImg', snapshot.val().photoURL);
      window.localStorage.setItem('myTours', JSON.stringify(snapshot.val().tours));
    });
    const mainObj = JSON.parse(window.localStorage.getItem('myTours'));
    const tourNames = Object.keys(mainObj);
    console.log(mainObj);

    this.setState({
      userName: window.localStorage.userName,
      profileImg: window.localStorage.profileImg,
      mainObj: mainObj,
      tourNames: tourNames
    })
}


  render() {
    return(
      <div>
        <NavBar />
          <div className="profilePageContainer">
            <div className="profilePicContainer">
              <img className="userProfileImg" src={this.state.profileImg} />
              <h1><span className="greeting">Hello</span> {this.state.userName}</h1>
              <Logout />
            </div>
            <div className="profilePageRightSide">
            <h2>My Tours</h2>
              <div className="profileToursContainer">
                <ul>
                  {this.state.tourNames.map(tourName => {
                    return(
                    <DisplayBreweries breweryArr={this.state.mainObj[tourName]} tourName={tourName}/>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        <Footer />
      </div>
    );
  }
}
export default Profile;
