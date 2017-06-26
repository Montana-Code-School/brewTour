import React from 'react';
import BeerAnimation from './beerAnimation';


class DisplayBreweries extends React.Component {
constructor(props) {
  super(props);

  this.state ={
    tourName: this.props.tourName,
    tour: this.props.breweryArr,
    clicked: false
  };
}

handleClick() {
  let change = !this.state.clicked
  this.setState({clicked: change});
}


render() {
  return(

    <div onClick={this.handleClick.bind(this)}>
      <BeerAnimation />
      <span className="displayBrewTourNameBtn">
         {this.state.tourName}
      </span>
      <ul>
        {this.state.clicked && this.state.tour.map(brewObj => {
          return(<li>{brewObj.brewery.name}</li>)
        })}
      </ul>
    </div>

  );
}
}
export default DisplayBreweries;
