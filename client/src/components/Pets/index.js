import React, { Component } from "react";
import Modal from 'react-modal';

const customStyles = {
  content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
  }
}

class Pets extends Component{
      constructor() {
        super();

        this.state = {
            modalIsOpen: false,
            users: []
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }
 
    render() {
    return (
      <div className="col-sm-3">
        <div className="card">
          <img src={'https://i.pinimg.com/originals/ae/c4/53/aec453161b2f33ffc6219d8a758307a9.jpg'} className="card-img-top img-responsive" alt="Cute Puppy" />
          <div className="card-body">
            <h5 className="card-title">{this.props.pet.pet_name}</h5>
            <p className="card-text">Age:{this.props.pet.age}</p>
            <p className="card-text">Primary Vet: {this.props.pet.primary_vet_id}</p>
            <p className="card-text">Emergency Vet: {this.props.pet.emergency_vet_id}</p>
            <p className="card-text">Pets description</p>
            <button onClick={this.openModal} className="btn_yellow">More information</button>
          </div>
        </div>

        <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >

            <h2 ref={subtitle => this.subtitle = subtitle}>{this.props.pet.pet_name}</h2>
            <hr />
            <p>Pet Name: {this.props.pet.pet_name}</p>
            <p>Pet Aage: {this.props.pet.age}</p>
            <p>Primary Vet: {this.props.pet.primary_vet_id}</p>
            <button type="button" className="btn_yellow" onClick={this.closeModal}>Close</button>
        </Modal>
      </div>
    )};
}

export default Pets