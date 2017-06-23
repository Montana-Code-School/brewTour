import React from 'react';
import Modal from 'react-bootstrap-modal';


class SimpleModal extends React.Component {
  constructor(props) {
    super(props);

      this.state={
          open:this.props.open
      }
  }

  render(){
    let closeModal = () => this.setState({ open: false })
    let openModal = () => this.setState({ open: true })
    let saveAndClose = () => {
      this.setState({ open: false })
    }

    return (
      <div>
        <Modal
          show={this.state.open}
          onHide={closeModal}
          aria-labelledby="ModalHeader"
        >
          <Modal.Header closeButton>
            <Modal.Title className='testHeader' id='ModalHeader'>A Title Goes here</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Some Content here</p>
          </Modal.Body>
          <Modal.Footer>
            <button className='btn btn-primary' onClick={saveAndClose}>
              Save
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
export default SimpleModal;
