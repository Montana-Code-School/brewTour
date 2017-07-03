import React from 'react';
import {auth, db} from '../config/configFirebase';
import Logout from './Logout';
import DisplayBreweries from "./DisplayBreweries";
import NavBar from './NavBar';
import Footer from './Footer';
import LimitedRater from 'react-rater';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName:'',
      myTours: '',
      tourNames:[],
      mainObj: '',
      profileImg: '',
      myBeers: '',
      beersObj: '',
      beerNames:[],
      getStars: '',
      beerRating: 0
      //profilePic: auth.currentUser.profilePic
    };
  }

  componentWillMount() {
    db.ref('/users/' + window.localStorage['brew-login-mrwickpk']).on('value', function(snapshot) {
      window.localStorage.setItem('userName', snapshot.val().displayName);
      window.localStorage.setItem('profileImg', snapshot.val().photoURL);
      window.localStorage.setItem('myTours', JSON.stringify(snapshot.val().tours));
      window.localStorage.setItem('myBeers', JSON.stringify(snapshot.val().beers));
    });
    const mainObj = JSON.parse(window.localStorage.getItem('myTours'));
    const tourNames = Object.keys(mainObj);
    const beersObj = JSON.parse(window.localStorage.getItem('myBeers'));
    const beerNames = Object.keys(beersObj);

    this.setState({
      userName: window.localStorage.userName,
      profileImg: window.localStorage.profileImg,
      mainObj: mainObj,
      beersObj: beersObj,
      tourNames: tourNames,
      beerNames: beerNames
    })
  }

  handleRate(event, nameOfBeer) {
    console.log(nameOfBeer.rating);
    console.log(event);
    const beerRating = nameOfBeer.rating;
    db.ref().child('users').child(auth.currentUser.uid).child('beers').child(event).update({
      Rating: {beerRating}
    }, () => console.log('successful save'));
  }

  render() {
    return(
      <div>
        {console.log(this.state.beersObj[0])}
        <NavBar />
          <div className="profilePageContainer">
            <div className="profilePicContainer">
              <img className="userProfileImg" src={this.state.profileImg} />
              <h1><span className="greeting">Hello</span> {this.state.userName}</h1>
              <table className="table table-striped beerProfileTable">
                <thead>
                  <th>SAVED BEERS</th>
                  <th>RATING</th>
                </thead>
                <tbody>
                {this.state.beerNames.map(beerTitle => {
                  console.log(this.state.beersObj[beerTitle].Rating);
                  return (
                    <tr>
                      <td>{beerTitle} </td>
                      <td className="ratedCell"><LimitedRater total={5} rating={this.state.beersObj[beerTitle].Rating.beerRating} limit={5} onRate={this.handleRate.bind(this, beerTitle)} /></td>
                      {console.log(this.state.beersObj[beerTitle].Rating)}
                    </tr>
                    );
                })}
                </tbody>
              </table>
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
