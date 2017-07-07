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

    if (window.localStorage.getItem('myTours') !== "undefined") {
      const mainObj = JSON.parse(window.localStorage.getItem('myTours')) || undefined;
      const tourNames = Object.keys(mainObj) || undefined;
      this.setState({
        tourNames: tourNames,
        mainObj: mainObj
      });
  }
  if (window.localStorage.getItem('myBeers') !== "undefined") {
    const beersObj = JSON.parse(window.localStorage.getItem('myBeers')) || undefined;
    const beerNames = Object.keys(beersObj) || undefined;
    this.setState({
      beerNames: beerNames,
      beersObj: beersObj
    })
}
    this.setState({
      userName: window.localStorage.userName,
      profileImg: window.localStorage.profileImg
    });
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
    const tours = this.state.tourNames;
    return(
      <div>
        {console.log(this.state.beersObj[0])}
        <NavBar />
          <div className="profilePageContainer">
            <div className="profilePicContainer">
              <img alt="It's you!" className="userProfileImg" src={this.state.profileImg} />
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
            {
              (tours.length > 1) ? <h2>MY TOURS</h2> : <p></p>
            }
              <div className="profileToursContainer">
                <ul>
                  {
                    (tours.length >= 1 ) ? tours.map(tourName => <DisplayBreweries breweryArr={this.state.mainObj[tourName]} tourName={tourName}/>) : <h2>GO MAKE SOME TOURS MATE!</h2>
                  }
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
