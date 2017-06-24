import React from 'react';


class BrewSearchResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tourBrewNames:[]
    }
  }

  buttonClicked(event) {
    console.log(event.target.value);
    this.props.tourArr.push(this.props.categories[event.target.value]);

    this.props.tourArr.map((brewery, i) =>
      this.props.tourArr[i].brewery.name
    )
  }

render() {
  return (

<div className='breweryListContainer'>
  <table className='table table-striped'>
    <thead>
      <tr>
      <th>BREWERY NAME</th>
      <th>SAVE IT!</th>
      </tr>
    </thead>
    <tbody>
      {this.props.categories.map((category, i) =>
        <tr>
        <td key={i}>{category.brewery.name}</td>
        <td><button type='button' value={i} onClick={this.buttonClicked.bind(this)}
        className='btn listBtn{i}'
        style={{backgroundColor:this.props.btnColor}}>ADD TO YOUR TOUR<span className='btnIcon'>></span></button></td>
        </tr>
      )}
    </tbody>
  </table>
</div>
);
}
}

export default BrewSearchResults;
