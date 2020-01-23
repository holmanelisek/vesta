import React, { Component } from "react";
import Select from 'react-select';
import API from "../../utils/API";

export class NewPetForm extends Component{
    state = {
        pet_name: undefined,
        age: undefined,
        animal_type: undefined,
        primary_vet_id: undefined,
        emergency_vet_id: undefined
    }

    getVetDropSelection = vetArray =>{
        console.log(vetArray)
        let vetDropSelection = vetArray.map(vet => {
            let vetObj = {};
            vetObj.value = vet.id 
            vetObj.label = vet.practice_name
            return vetObj;
        })
        return vetDropSelection;
    }

    handleInputChange = event => {
        //event.preventDefault();
        const { name, value } = event.target;
        this.setState({ [name]: value.trim() })
    }

    handleSelectionPrimary = selection =>{
        this.setState({primary_vet_id: selection.value})
    }

    handleSelectionEmergency = selection => {
        this.setState({emergency_vet_id: selection.value});
    }

    submitNewPet = () =>{
        API.addPet({
            home_id: this.props.home_id,
            pet_name: this.state.pet_name,
            age: this.state.age,
            animal_type: this.state.animal_type,
            primary_vet_id: this.state.primary_vet_id,
            emergency_vet_id: this.state.emergency_vet_id
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
                    {/*Pet Name Input*/}
                    <div className="my-2">
                        <input 
                            value={this.state.pet_name}
                            onChange = {this.handleInputChange}
                            type="text" 
                            name ="pet_name"
                            id="pet_name" 
                            className="form-control validate"
                            placeholder="Pet Name"/>
                    </div>
                    {/* Pet Age */}
                    <div className="my-2">
                        <input
                            value={this.state.age}
                            onChange = {this.handleInputChange}
                            type="number"
                            name="age"
                            id="age" 
                            className="form-control validate"
                            placeholder="Pet Age"/>
                    </div>
                    {/* Pet Type */}
                    <div className="my-2">
                        <input 
                            value={this.state.animal_type}
                            onChange = {this.handleInputChange}
                            type="text" 
                            name="animal_type"
                            id="animal_type" 
                            className="form-control validate"
                            placeholder="Pet Type"/>
                    </div>
                    {/* Primary Vet */}
                    <div className="my-2">
                            <Select
                                value={this.primary_vet_id}
                                onChange={this.handleSelectionPrimary}
                                options={this.getVetDropSelection(this.props.primary_vets)}
                                name="primary_vet_id"
                            />
                    </div>
                    {/* Password Input */}
                    <div className="my-2">
                            <Select
                                value={this.emergency_vet_id}
                                onChange={this.handleSelectionEmergency}
                                options={this.getVetDropSelection(this.props.primary_vets)}
                                name="emergency_vet_id"
                            />
                    </div>
                </div>
                <div className="modal-footer d-flex justify-content-center">
                    {/* Submit Button */}
                    <button type="submit" onClick={this.submitNewPet} className="btn btn-deep-orange">Add Pet</button>
                </div>
            </div>
        );
    }
}

export function NewPetTitle(){
    return(
        <div className="">
            <h2>New Pet Information</h2>
        </div>
    )
}