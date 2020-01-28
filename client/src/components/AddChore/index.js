import React, { Component } from 'react';
import Select from 'react-select';
import API from "../../utils/API";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export class AddChore extends Component {
    constructor() {
        super()

        this.state = {
            users: [],
            chore_name: undefined,
            assigned_user: undefined,
            point_value: undefined,
            startDate: new Date(),
            endDate: new Date(),
        }

        this.handleInputChange = this.handleInputChange.bind(this)
    }

    // Handles text input
    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // Handles date changing in 'start date' field
    handleStartDateChange = date => {
        this.setState({
            startDate: date
        });
    };

    // Handles date changing in 'end date' field
    handleEndDateChange = date => {
        this.setState({
            endDate: date
        });
    };

    // Handles dropdown
    handleChange = selection => this.setState({ assigned_user: selection.value });

    // Function for storing users first names for dropdown list
    storeNames = array => array.first_name;

    // Gets all home users
    grabUsers = userHome => {
        API.getAllHomeUsers({
            home_id: userHome
        })
            .then(res => {
                let usersArray = res.data.map(this.storeNames)
                usersArray.push("None")
                this.setState({ users: usersArray });
            })
    }

    // Sets 'created_by' start to current user's first name
    assignCreatedBy = () => {
        API.isSignedIn().then(res => {
            console.log(res)
            this.setState({ created_by: res.data.username })
            console.log("User assigned:" + this.state.created_by)
        })
    }

    // Post to API for submitting new chore
    submitChore = () => {
        API.addChore({
            home_id: this.props.home_id,
            chore_name: this.state.chore_name,
            created_by: this.props.created_by,
            assigned_user: this.state.assigned_user,
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
                this.props.getChores(this.props.home_id)
                this.props.closeModal()
            })
            .catch(err => {
                console.log(err)
            });
    }

    // Creating object of user names for dropdown
    buildOptions = () => {
        const userOptions = this.state.users.map(user => ({ value: user, label: user }))

        return userOptions;
    }

    // Calling grabUsers function
    componentDidMount = () => {
        this.grabUsers(this.props.home_id)
    }

    render() {
        return (
            <div>
                <div className="my-2">
                    {/*Name of Chore*/}
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
                {/*Assigned user*/}
                < Select
                    value={this.assigned_user}
                    onChange={this.handleChange}
                    options={this.buildOptions()}
                />
                <div className="my-2">
                    {/*Point Value*/}
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
                <div className="my-2">
                    {/*Chore start*/}
                    <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleStartDateChange}
                        showTimeSelect
                        showYearDropdown
                        timeIntervals={30}
                        timeCaption="time"
                        dateFormat="MMMM d, yyyy h:mm aa"
                        placeholderText="Start date and time"
                    />
                </div>
                <div className="my-2">
                    {/*Be done before*/}
                    <DatePicker
                        selected={this.state.endDate}
                        onChange={this.handleEndDateChange}
                        showTimeSelect
                        showYearDropdown
                        timeIntervals={30}
                        timeCaption="time"
                        dateFormat="MMMM d, yyyy h:mm aa"
                        placeholderText="End date and time"
                    />
                </div>
                <button disabled={!this.state.chore_name || !this.state.assigned_user || !this.state.point_value || !this.state.startDate || !this.state.endDate} type="button" className="btn btn-secondary" onClick={this.submitChore}>Add</button>
            </div>
        );
    }
}

// Add Chore modal title
export function AddChoreTitle() {
    return (
        <div>
            <h2>Add a new chore</h2>
        </div>
    )
}

