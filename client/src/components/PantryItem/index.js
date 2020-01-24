import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Modal } from 'react-bootstrap'
import API from '../../utils/API'
import Moment from 'react-moment'

class PantryItem extends Component {
    state = {
        modalShow: false,
        modalFunc: undefined
    }

    openModal = (modalFunc) => {
        this.setState({ modalFunc: modalFunc })
        this.setState({ modalShow: true });
    }

    closeModal = () => {
        this.setState({ modalShow: false });
    }

    render() {
        return (
            <li className="list-group-item d-flex justify-content-between align-items-left">
                <span></span>
                {this.props.item_name}
                <span>Date In: {this.props.date_in}</span>
                <button type="button" className="btn btn-danger"><i className="fas fa-minus"></i></button>
                <span>Quantity: <span className="badge badge-secondary badge-pill">{this.props.quantity}</span></span>
                {/* <span className="badge badge-secondary badge-pill">{this.props.quantity}</span> */}
                <button type="button" className="btn btn-success"><i className="fas fa-plus"></i></button>
            </li>
        )
    }
}

export default PantryItem;