import React from "react";
import {db, auth} from "../config/configFirebase";


class CreateTour extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tourArr: this.props.tourArr,
      tourName: ''
    };
  }

  handleChange(event) {
    this.setState({
      tourName: event.target.value
    });
  }

  handleSubmit(event) {
    const tour = this.state.tourName;
    event.preventDefault();
    db.ref().child('users').child(auth.currentUser.uid).child('tours').update({
      [tour]: this.state.tourArr
    });

  }

render() {
  return(
    <div>
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input
          type='text'
          placeholder="Enter your Tour's unique name!"
          value={this.state.tourName}
          onChange={this.handleChange.bind(this)}
          />
        <input type='submit' value="Save my Tour" />
      </form>
    </div>
  );
}

}
export default CreateTour;
