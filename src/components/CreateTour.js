import React from "react";
import {db, auth} from "../config/configFirebase";



class CreateTour extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tourArr: this.props.tourArr,
      tourName: '',
      itemToRemove: ''
    };
  }

  handleChange(event) {
    this.setState({
      tourName: event.target.value,
    });
  }

  handleSubmit(event) {
    const tour = this.state.tourName;
    event.preventDefault();
    db.ref().child('users').child(auth.currentUser.uid).child('tours').update({
      [tour]: this.state.tourArr
    });

  }

  removeItemClicked(event) {
    this.state.itemToRemove = this.state.tourArr.indexOf(event.target.value);
    this.state.tourArr.splice(this.state.itemToRemove, 1);
    console.log(this.state.tourArr);

    this.setState({
      itemToRemove: ''
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
      <table className='table table-striped'>
        <thead>
          <tr>
          <th>BREWERY NAME</th>
          <th>REMOVE</th>
          </tr>
        </thead>
        <tbody>
          {this.state.tourArr.map((spot) =>
            <tr>
              <td>{spot.brewery.name}</td>
              <td><button type='button' onClick={this.removeItemClicked.bind(this)} className='btn listBtn'>X</button></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

}
export default CreateTour;
