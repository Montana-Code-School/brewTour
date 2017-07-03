import React from "react";
import {db, auth} from "../config/configFirebase";
import Modal from 'react-bootstrap-modal';
import {Link, Redirect} from 'react-router-dom';

class CreateTour extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tourArr: this.props.tourArr,
      tourName: '',
      open: ''
    };
  }

    closeModal = () => this.setState({ open: false })
    openModal = () => this.setState({ open: true })
    saveAndClose = () => {
      this.setState({
        open: false
      })
      window.location.reload();
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
    }, this.openModal());

  }


  removeItemClicked(idx) {
    this.state.tourArr.splice(idx, 1);
    this.setState({
      itemToRemove: ''
    });
  }

render() {
  return(
    <div>
      <div>
        <Modal
          show={this.state.open}
          onHide={this.closeModal}
          aria-labelledby="ModalHeader"
        >
          <Modal.Header closeButton>
            <Modal.Title className='testHeader' id='ModalHeader'>TOUR SAVED!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Make More Tours Or Navigate To Your Profile To See Your Saved Tours</p>
          </Modal.Body>
          <Modal.Footer>
            <button className='btn btn-primary' onClick={this.saveAndClose}>
              OK
            </button>
          </Modal.Footer>
        </Modal>
      </div>

      <table className='table table-striped'>
        <thead>
          <tr>
          <th>BREWERY NAME</th>
          <th>REMOVE</th>
          </tr>
        </thead>
        <tbody>
          {this.state.tourArr.map((spot, i) =>
            <tr>
              <td>{spot.brewery.name}</td>
              <td><button type='button' onClick={this.removeItemClicked.bind(this, i)} className='btn rmBtn listBtn'>X</button></td>
            </tr>
          )}
        </tbody>
      </table>
      <form className="createTourForm row" onSubmit={this.handleSubmit.bind(this)}>
        <input
          type='text'
          placeholder="Enter your Tour's unique name!"
          value={this.state.tourName}
          className="tourNameInput col-lg-10"
          onChange={this.handleChange.bind(this)}
          />
        <input className="col-lg-2 stateInputBtn" type="submit" value="SAVE" />
      </form>

    </div>
  );
}

}
export default CreateTour;
