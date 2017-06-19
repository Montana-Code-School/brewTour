import React from 'react';


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

    <div>
      <button onClick={this.handleClick.bind(this)}>
         {this.state.tourName}
      </button>
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
