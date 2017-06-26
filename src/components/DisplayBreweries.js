import React from 'react';
import VisitedButton from './VisitedButton';
import BeerAnimation from './beerAnimation';
import {db, auth} from "../config/configFirebase";


class DisplayBreweries extends React.Component {
constructor(props) {
  super(props);

  this.state ={
    tourName: this.props.tourName,
    tour: this.props.breweryArr,
    percentage: 0,
    clicked: false
  };
}

handleClick() {
  let change = !this.state.clicked

  this.setState({clicked: change});
  db.ref().child('users').child(auth.currentUser.uid).child('tours').child(this.state.tourName).on('value', snap =>{
    let count = 0;
    snap.val().map(brewObj => {
      if (brewObj.visited) count += 1;
    });
    let percentage = (count/ this.state.tour.length) * 100;
    this.setState({
      percentage: percentage
    });
  });
}

render() {
  console.log(this.state.percentage);
  return(

    <div>
      <div onClick={this.handleClick.bind(this)}>
        <BeerAnimation />
        <span className="displayBrewTourNameBtn">
          {this.state.tourName}
         </span>
      </div>
      <ul>
        {this.state.clicked && this.state.tour.map((brewObj, index) => {

          return(
            <div>
              <li>{brewObj.brewery.name}</li>
              <VisitedButton visited={brewObj.visited} tourName={this.state.tourName} tour={this.state.tour} brewIndex={index}/>
            </div>
          )
        })}
      </ul>
    </div>

  );
}
}
export default DisplayBreweries;
