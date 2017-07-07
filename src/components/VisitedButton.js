import React from 'react';
import {db, auth} from "../config/configFirebase";
import {Expo,TweenMax, Power2, TimelineLite, Elastic} from 'gsap';
import GSAP from 'react-gsap-enhancer';



export default class VisitedButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visited: this.props.visited
    };
  }

componentDidMount() {
  console.log('mounted');
}
  handleChange() {
    window.loaction = "https://www.google.com/maps/dir/Current+Location/" + this.props.lat + ","+this.props.lon;
    const visited = !this.state.visited;
    this.setState({
      visited: visited
    });
    db.ref().child('users').child(auth.currentUser.uid).child('tours').child(this.props.tourName).child(this.props.brewIndex).update({
      visited: visited
    }, () => console.log('successful save'));
  }


  render() {
    return(
      <div className="VisitedButton">
        <a href={"https://www.google.com/maps/dir/Current+Location/" + this.props.lat + ","+this.props.lon} target="_blank">
          <img id='travelIcon' src="img/takeMeThereIconWhite.png" /></a>
          <input id="VisitedCheckBox"onChange={this.handleChange.bind(this)} type='checkbox'value={this.state.visited} checked={this.state.visited} href={"https://www.google.com/maps/dir/Current+Location/" + this.props.lat + ","+this.props.lon} target="_blank" />
      </div>
    );
  }
}
