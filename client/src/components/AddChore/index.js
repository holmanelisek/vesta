import React from 'react';
import Select from 'react-select';
import API from "../../utils/API";
// import Modal from 'react-modal'
import { Modal } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


class AddChore extends React.Component {
    constructor() {
        super();

        this.state = {
            user_id: undefined,
            modalShow: false,
            selectedOption: undefined,
            users: [],
            chore_name: undefined,
            created_by: undefined,
            point_value: undefined,
            startDate: new Date(),
            endDate: new Date(),
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

    handleStartDateChange = date => {
        this.setState({
            startDate: date
        });
    };

    handleEndDateChange = date => {
        this.setState({
            endDate: date
        });
    };

    handleChange = selectedOption => {
        this.setState({ selectedOption });
    };

    storeUsernames = array => {
        return array.username;
    }

    grabUsers = userHome => {
        API.getAllHomeUsers({
            home_id: userHome
        })
            .then(res => {
                let usersArray = res.data.map(this.storeUsernames)
                usersArray.push("None")
                this.setState({ users: usersArray });
            })
    }

    assignCreatedBy = () => {
        API.isSignedIn().then(res => {
            console.log(res)
            this.setState({ created_by: res.data.username })
            console.log("User assigned:" + this.state.created_by)
        })
    }

    submitChore = () => {
        API.addChore({
            home_id: 1,
            chore_name: this.state.chore_name,
            created_by: this.state.created_by,
            assigned_user: this.state.selectedOption.value,
            point_value: this.state.point_value,
            start_date_time: this.state.startDate,
            end_date_time: this.state.endDate,
            repeats: false,
            repeat_interval: "d",
            completed: false,
            completed_by: this.state.created_by
        })
            .then(res => {
                console.log(res)
                // this.props.ge
                this.closeModal()
            });
        console.log("name: " + this.state.chore_name)
        console.log("assigned: " + this.state.selectedOption.value)
        console.log("created: " + parseInt(this.state.created_by))
        console.log("points: " + parseInt(this.state.point_value))
        console.log("start: " + this.state.startDate)
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value.trim() });
    };

    componentDidMount() {
        this.assignCreatedBy()
        this.grabUsers(1);
    }

    render() {
        const userOptions = this.state.users.map(user => (
            { value: user, label: user }
        ))

        const { selectedOption } = this.state;


        return (
            <div>
                <button type="button" className="btn btn-secondary" onClick={this.openModal}>Add Chore</button>
                <Modal
                    show={this.state.modalShow}
                    onHide={this.closeModal}
                    backdrop='static'
                >
                    <Modal.Header>
                        <h2>Add chore</h2>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <span>Name of Chore</span>
                            <input
                                value={this.state.chore_name}
                                onChange={this.handleInputChange}
                                type="text"
                                name="chore_name"
                                id="chore-name"
                                className="form-control"
                                placeholder="Chore name"
                            ></input>
                        </div>
                        <span>Assigned user</span>
                        <Select
                            value={selectedOption}
                            onChange={this.handleChange}
                            options={userOptions}
                        />
                        <div>
                            <span>Point Value</span>
                            <input
                                value={this.state.point_value}
                                onChange={this.handleInputChange}
                                type="number"
                                min="0"
                                name="point_value"
                                id="point-value"
                                className="form-control"
                                placeholder="Point value"
                            ></input>
                        </div>
                        <div>
                            <span>Chore start</span>
                            <br />
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleStartDateChange}
                                showTimeSelect
                                showYearDropdown
                                timeIntervals={30}
                                timeCaption="time"
                                dateFormat="MMMM d, yyyy h:mm aa"
                                placeholderText="Click for date and time"
                            />
                        </div>
                        <div>
                            <span>Be done before</span>
                            <br />
                            <DatePicker
                                selected={this.state.endDate}
                                onChange={this.handleEndDateChange}
                                showTimeSelect
                                showYearDropdown
                                timeIntervals={30}
                                timeCaption="time"
                                dateFormat="MMMM d, yyyy h:mm aa"
                                placeholderText="Click for date and time"
                            />
                        </div>
                        <button type="button" className="btn btn-secondary" onClick={this.submitChore}>Add</button>
                    </Modal.Body>
                </Modal>
            </div >
        );
    }
}

export default AddChore

// import React from 'react'
// import API from '../../utils/API'

// class AddChore extends React.Component {
//     constructor() {
//         super();

//         this.state = {
//             users: [],
//             chore_name: '',
//             created_by: '',
//             assigned_user: '',
//             point_value: '',
//             start_date_time: '',
//             end_date_time: '',
//             repeats: '',
//             repeat_interval: '',
//         }
//     }

//     storeUsernames = array => {
//         return array.username;
//     }

//     grabUsers = userHome => {
//         API.getAllHomeUsers({
//             home_id: userHome
//         })
//             .then(res => {
//                 let usersArray = res.data.map(this.storeUsernames)
//                 this.setState({ users: usersArray });
//             })
//     }

//     render() {
//         return (
//             <div>
//                 <div>
//                     <input
//                         value={this.state.chore_name}
//                         onChange={this.props.handleInputChange}
//                         type="text"
//                         name="chore name"
//                         id="chore-name"
//                         className="form-control"
//                         placeholder="Chore name"
//                     ></input>
//                 </div>
//                 <div>
//                     <select
//                         value={this.state.assigned_user}
//                         onChange={this.props.handleInputChange}
//                         type="text"
//                         name="assigned user"
//                         id="assigned-user"
//                         className="form-control"
//                         placeholder=""
//                     ></select>
//                     {this.state.users.map(user => (
//                         <option>{user}</option>
//                     ))}
//                 </div>
//                 <div>
//                     <input
//                         value={this.state.chore_name}
//                         onChange={this.props.handleInputChange}
//                         type="text"
//                         name="chore name"
//                         id="chore-name"
//                         className="form-control"
//                         placeholder="Chore name"
//                     ></input>
//                 </div>
//                 <div>
//                     <input
//                         value={this.state.chore_name}
//                         onChange={this.props.handleInputChange}
//                         type="text"
//                         name="chore name"
//                         id="chore-name"
//                         className="form-control"
//                         placeholder="Chore name"
//                     ></input>
//                 </div>
//                 <div>
//                     <input
//                         value={this.state.chore_name}
//                         onChange={this.props.handleInputChange}
//                         type="text"
//                         name="chore name"
//                         id="chore-name"
//                         className="form-control"
//                         placeholder="Chore name"
//                     ></input>
//                 </div>
//                 <div>
//                     <input
//                         value={this.state.chore_name}
//                         onChange={this.props.handleInputChange}
//                         type="text"
//                         name="chore name"
//                         id="chore-name"
//                         className="form-control"
//                         placeholder="Chore name"
//                     ></input>
//                 </div>
//                 <div>
//                     <input
//                         value={this.state.chore_name}
//                         onChange={this.props.handleInputChange}
//                         type="text"
//                         name="chore name"
//                         id="chore-name"
//                         className="form-control"
//                         placeholder="Chore name"
//                     ></input>
//                 </div>
//             </div>
//         )
//     }
// }

// export default AddChore