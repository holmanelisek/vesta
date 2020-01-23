
import React from 'react';
import ReactDOM from 'react-dom';
// import Modal from 'react-modal';
import { Modal } from 'react-bootstrap'
import API from '../../utils/API'
import Moment from 'react-moment'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('#yourAppElement')

class Chores extends React.Component {
    constructor() {
        super();

        this.state = {
            // modalIsOpen: false,
            users: [],
            modalShow: false
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        // this.openModal = this.openModal.bind(this);
        // this.afterOpenModal = this.afterOpenModal.bind(this);
        // this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({ modalShow: true });
    }

    closeModal() {
        this.setState({ modalShow: false });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00';
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
            })
    }

    markCompleted = id => {
        API.markChoreComplete({
            choreData: id
        })
            .then(res => {
                console.log(res)
                alert("Chore completed!")
                this.props.getChores(1)
                // if (res) {
                //     alert("Chore Completed")
                //     console.log(res)
                // }
                // this.props.getChores()
            })
    }

    handleClose = () => {
        this.setState({ modalShow: false })
    }

    componentDidMount = () => {
        this.grabUsers(1);
    }

    render() {
        return (
            <div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item list-group-item-success">{this.props.choreName}<br />
                        <button type="button" className="btn btn-secondary" style={{ margin: 5 }} onClick={this.openModal}>More Info...</button>
                        <button type="button" className="btn btn-success" onClick={() => this.markCompleted(this.props.id)} style={{ margin: 5 }}>Completed!</button>
                    </li>
                </ul>
                <Modal
                    show={this.state.modalShow}
                    onHide={this.closeModal}
                    backdrop='static'
                // isOpen={this.state.modalIsOpen}
                // onAfterOpen={this.afterOpenModal}
                // onRequestClose={this.closeModal}
                // style={customStyles}
                // contentLabel="Example Modal"
                >
                    <Modal.Header>
                        <h2 ref={subtitle => this.subtitle = subtitle}>{this.props.choreName}</h2>
                        <hr />
                    </Modal.Header>
                    <Modal.Body>
                        <p>Created by: {this.state.users[this.props.createdBy + 1]}</p>
                        <p>Assigned to: {this.state.users[this.props.assignedUser + 1] ? this.state.users[this.props.assignedUser + 1] : "None"}</p>
                        <p>Point value: {this.props.pointValue ? this.props.pointValue : "None"}</p>
                        {/* <p>Time/Date assigned: {this.props.startDateTime ? this.props.startDateTime : "None"}</p> */}
                        <p>Time/Date assigned: <Moment format="MM/DD/YYYY LT">{this.props.startDateTime}</Moment></p>
                        <p>Needs done before: <Moment format="MM/DD/YYYY LT">{this.props.endDateTime}</Moment></p>
                        {/* <p>Needs done before: <Moment>{this.props.endDateTime ? this.props.endDateTime : "None"}</Moment></p> */}
                        {/* <p>Needs done before: {this.props.endDateTime ? this.props.endDateTime : "None"}</p> */}
                        <p>Repeats: {this.props.repeatInterval === "d" ? "daily"
                            : this.props.repeatInterval === "w" ? "weekly"
                                : this.props.repeatInterval === "m" ? "monthly"
                                    : this.props.repeatInterval === "y" ? "yearly"
                                        : "No repeat"}</p>
                        <button type="button" className="btn btn-secondary" onClick={this.closeModal}>Close</button>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default Chores