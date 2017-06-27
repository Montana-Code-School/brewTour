import React from 'react';
import {db, auth} from "../config/configFirebase";


export default class VisitedButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visited: this.props.visited,
    };
  }

componentDidMount() {
  console.log('mounted');
}
  handleChange() {
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
      <div>
        <input onChange={this.handleChange.bind(this)} type='checkbox'value={this.state.visited} checked={this.state.visited}/>
      </div>
    );
  }
}
