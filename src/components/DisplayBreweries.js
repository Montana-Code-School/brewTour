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
componentDidMount() {
  this.calcPercent();
}

handleClick() {
  let change = !this.state.clicked;
  this.setState({clicked: change});
  this.calcPercent();
}

calcPercent() {
  db.ref('/users/' + window.localStorage['brew-login-mrwickpk']+'/tours/'+ this.state.tourName).on('value', snap => {
    let count = 0;
    snap.val().map(brewObj => {
      if (brewObj.visited) count += 1;
    });
    let percentage = (count/ snap.val().length) * 100;
    this.setState({
      tour: snap.val(),
      percentage: percentage
    });
  });
}

render() {
  console.log(this.state.percentage);
  return(

    <div>
      <div onClick={this.handleClick.bind(this)}>
        <BeerAnimation percentage={this.state.percentage}/>
        <span className="displayBrewTourNameBtn">
          {this.state.tourName}
         </span>
      </div>
      <ul>
        {this.state.clicked && this.state.tour.map((brewObj, index) => {
          console.log(brewObj);
          return(
            <div className="BreweryListItem">
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
