import React from 'react';
import {TimelineLite} from 'gsap';

class BrewSearchResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tourBrewNames:[],
      active: null,
      flag: false
    }
  }

  buttonClicked(event) {
    if (this.props.categories[event.target.value] !== undefined) {
        let brewObj = this.props.categories[event.target.value];
        brewObj.visited = false;
        this.props.tourArr.push(brewObj);
        this.props.tourArr.map((brewery, i) =>
          this.props.tourArr[i].brewery.name
        );

        const element = document.querySelector('#btn' + event.target.value);
        const buttonPop = new TimelineLite();

        buttonPop.fromTo('#btn' +event.target.value, .4, {scale: .9}, {scale:1})
                .to('#btn' +event.target.value,.4, {css:{background:'#0878E5', color: 'white'}}, '-=.4')
                .call(() => element.textContent = "ADDED TO TOUR!", this, '-=1');
        }

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
    <tbody alt="list of breweries">
      {this.props.categories.map((category, i) =>
        <tr>
        <td alt={category.brewery.name} key={i}>{category.brewery.name}</td>
        <td><button type='button' value={i} id={"btn" +i} onClick={this.buttonClicked.bind(this)}
        className='btn listBtn'
        >ADD TO YOUR TOUR<span className='btnIcon'>></span></button></td>
        </tr>
      )}
    </tbody>
  </table>
</div>
);
}
}

export default BrewSearchResults;
