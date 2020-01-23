import React, { Component } from "react";
import Select from 'react-select';
import API from "../../utils/API";

const abbrStates =[ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];
console.log("[NewVetForm]")
const stateDropSelection = abbrStates.map(state=> ({value: state, label : state}))

export class NewVetForm extends Component{
    state = {
        practice_name: undefined,
        phone_number: undefined,
        street: undefined,
        city: undefined,
        us_state: undefined,
        zip: undefined,
        email: undefined,
        emergency_clinic: undefined
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value.trim() })
    }

    handleSelectionState = selection => {
        console.log(selection)
        this.setState({us_state: selection.value})
    }

    submitNewVet = () =>{
        API.addNewVet({
            practice_name: this.state.practice_name,
            phone_number: this.state.phone_number,
            street: this.state.street,
            city: this.state.city,
            state: this.state.us_state,
            zip: this.state.zip,
            email: this.state.email,
            emergency_clinic: this.state.emergency_clinic
        }).then( response => {
            console.log(response)
            this.props.getPetData(this.props.home_id)
            this.props.closeModal();
        }).catch(err => {
            console.log(err)
        })
    }

    render(){
        return (
            <div>
                <div className="modal-body mx-2">
                    {/*Vet Practice Name*/}
                    <div className="my-2">
                        <input 
                            value={this.state.practice_name}
                            onChange = {this.handleInputChange}
                            type="text" 
                            name ="practice_name"
                            id="practice_name" 
                            className="form-control"
                            placeholder="Practice Name"/>
                    </div>
                    {/* Phone Number */}
                    <div className="my-2">
                        <input
                            value={this.state.phone_number}
                            onChange = {this.handleInputChange}
                            type="number"
                            name="phone_number"
                            id="phone_number" 
                            className="form-control validate"
                            placeholder="Phone Number"/>
                    </div>
                    {/* Street Address */}
                    <div className="my-2">
                        <input 
                            value={this.state.street}
                            onChange = {this.handleInputChange}
                            type="text" 
                            name="street"
                            id="street" 
                            className="form-control validate"
                            placeholder="Street Address"/>
                    </div>
                    {/* City*/}
                    <div className="my-2">
                        <input 
                            value={this.state.city}
                            onChange = {this.handleInputChange}
                            type="text" 
                            name="city"
                            id="city" 
                            className="form-control validate"
                            placeholder="City"/>
                    </div>
                    {/*State and Zip*/}
                    <div className="my-2">
                        <span>
                            <Select
                                value={this.us_state}
                                onChange={this.handleSelectionState}
                                options={stateDropSelection}
                                name="us_state"
                            />
                        </span>
                        <span>
                            <input 
                                value={this.state.zip}
                                onChange = {this.handleInputChange}
                                type="number" 
                                name="zip"
                                id="zip" 
                                className="form-control validate"
                                placeholder="Zip Code"/>
                        </span>
                    </div>
                    {/* Email */}
                    <div className="my-2">
                        <input 
                            value={this.state.email}
                            onChange = {this.handleInputChange}
                            type="text" 
                            name="email"
                            id="email" 
                            className="form-control validate"
                            placeholder="Email Address"/>
                    </div>
                    {/* Emergency CLinic */}
                    <div className="my-2">
                        <input 
                            value={this.state.emergency_clinic}
                            onChange = {this.handleInputChange}
                            type="emergency_clinic" 
                            name="emergency_clinic"
                            id="street" 
                            className="form-control validate"
                            placeholder="Emergency Clinic"/>
                    </div>
                </div>
                <div className="modal-footer d-flex justify-content-center">
                    {/* Submit Button */}
                    <button type="submit" onClick={this.submitNewVet} className="btn btn-deep-orange">Add Vet</button>
                </div>
            </div>
        );
    }
}

export function NewVetTitle(){
    return(
        <div className="">
            <h2>New Vet Information</h2>
        </div>
    )
}