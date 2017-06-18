import React from 'react';
import {auth, db} from '../config/configFirebase';



class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName:'',
      myTours: '',
      myArr:[]
      //profilePic: auth.currentUser.profilePic
    };
  }



  componentDidMount() {
    db.ref('/users/' + window.localStorage['brew-login-mrwickpk']).on('value', function(snapshot) {
      window.localStorage.setItem('userName', snapshot.val().displayName);
      window.localStorage.setItem('myTours', JSON.stringify(snapshot.val().tours));
    });
    const myArr = Object.keys(JSON.parse(window.localStorage.getItem('myTours')));

    this.setState({
      userName: window.localStorage.userName,
      myTours: window.localStorage.myTours,
      myArr: myArr
    })
}

displayTour() {
  return(

    <div>
      <p>Hello World</p>
    </div>
  );
}

  render() {
    return(
      <div>
        <h1>Hello {this.state.userName}</h1>
        <div>
          <h2>My Tours</h2>
          <ul>
            {this.state.myArr.map(tourName => {
              return(
                <button onClick={this.displayTour.bind(this)} value={tourName}>
                  {tourName}
                </button>
              );
            })}
          </ul>
          {this.displayTour()}
        </div>
      </div>
    );
  }
}
export default Profile;
