
import React, { Component } from 'react';
import { Modal } from 'react-bootstrap'
import API from '../../utils/API'
import Moment from 'react-moment'

class Chores extends React.Component {
    constructor() {
        super();

        this.state = {
            users: [],
            modalShow: false,
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }


    openModal() {
        this.setState({ modalShow: true });
    }

    closeModal() {
        this.setState({ modalShow: false });
    }

    storeUsernames = array => {
        return array.username;
    }

    grabUsers = userHome => {
        API.getAllHomeUsers({
            home_id: userHome
        })
            .then(res => {
                let usersArray = res.data.map(this.storeUsernames)
                this.setState({ users: usersArray });
                return usersArray;
            })
    }

    markCompleted = (id, completed_by, completed_by_id, completed_by_points) => {
        API.markChoreComplete({
            id: id,
            completed_by: completed_by,
            completed_by_id: completed_by_id,
            completed_by_points: completed_by_points
        })
            .then(res => {
                console.log(res)
                this.props.getChores(this.props.home_id)
            })
    }

    handleClose = () => {
        this.setState({ modalShow: false })
    }

    componentDidMount = () => {
        this.grabUsers(this.props.home_id);
        console.log(this.props.completedByPoints);
    }

    render() {
        return (
            <div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item list-group-item-success">{this.props.choreName}<br />
                        <button type="button" className="btn btn-secondary" style={{ margin: 5 }} onClick={this.openModal}>More Info...</button>
                        <button type="button" className="btn btn-success" onClick={() => this.markCompleted(this.props.id, this.props.first_name, this.props.user_id, this.props.completedByPoints)} style={{ margin: 5 }}>Completed!</button>
                    </li>
                </ul>
                <Modal
                    show={this.state.modalShow}
                    onHide={this.closeModal}
                    backdrop='static'
                >
                    <Modal.Header>
                        <h2 ref={subtitle => this.subtitle = subtitle}>{this.props.choreName}</h2>
                        <hr />
                    </Modal.Header>
                    <Modal.Body>
                        <p>Created by: {this.props.createdBy}</p>
                        <p>Assigned to: {this.props.assignedUser}</p>
                        <p>Point value: {this.props.pointValue ? this.props.pointValue : "None"}</p>
                        <p>Time/Date assigned: <Moment format="MM/DD/YYYY LT">{this.props.startDateTime}</Moment></p>
                        <p>Needs done before: <Moment format="MM/DD/YYYY LT">{this.props.endDateTime}</Moment></p>
                        <button type="button" className="btn btn-secondary" onClick={this.closeModal}>Close</button>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default Chores