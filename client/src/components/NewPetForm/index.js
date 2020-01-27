import React, { Component, } from "react";
import Select from 'react-select';
import API from "../../utils/API";
import Spinner from 'react-bootstrap/Spinner'

export class NewPetForm extends Component {
    constructor() {
        super()

        this.state = {
            pet_name: undefined,
            age: undefined,
            animal_type: undefined,
            primary_vet_id: undefined,
            emergency_vet_id: undefined,
            vet_display: "myVets",
            pet_image: undefined,
            pet_image_Data: undefined,
            pet_image_url: undefined,
            loading: false
        }

        this.handleInputChange = this.handleInputChange.bind(this)
    }

    getVetDropSelection = () => {
        let vetArray = this.props.primary_vets;
        if (this.state.vet_display === "all") {
            vetArray = this.props.all_vets
        }
        console.log(vetArray)
        let vetDropSelection = vetArray.map(vet => {
            let vetObj = {};
            vetObj.value = vet.id
            vetObj.label = vet.practice_name
            return vetObj;
        })
        console.log(vetDropSelection)
        return vetDropSelection;
    }

    // handleInputChange = event => {
    //     //event.preventDefault();
    //     const { name, value } = event.target;
    //     this.setState({ [name]: value.trim() })
    // }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSelectionPrimary = selection => {
        this.setState({ primary_vet_id: selection.value })
    }

    handleSelectionEmergency = selection => {
        this.setState({ emergency_vet_id: selection.value });
    }

    getAllVetDropSelection = () => {
        this.setState({ vet_display: "all" })
        this.getVetDropSelection();
    }

    getMyVetsDropSelection = () => {
        this.setState({ vet_display: "myVets" })
        this.getVetDropSelection();
    }

    submitNewPet = () => {
        API.addPet({
            home_id: this.props.home_id,
            pet_name: this.state.pet_name,
            age: this.state.age,
            animal_type: this.state.animal_type,
            primary_vet_id: this.state.primary_vet_id,
            emergency_vet_id: this.state.emergency_vet_id,
            image_url: this.state.pet_image_url
        }).then(response => {
            console.log(response)
            this.props.getPetData(this.props.home_id)
            this.props.closeModal();
        }).catch(err => {
            console.log(err)
        })
    }

    testLoader = () => {
        this.setState({ loading: true })
        setTimeout(
            function () {
                this.setState({ loading: false });
            }
                .bind(this),
            2000
        );
    }

    getImageSigned = () => {
        //Sending Image to S3
        this.setState({ loading: true })
        console.log("Sending Image")
        console.log(this.state.pet_image_Data)
        let imgData = this.state.pet_image_Data
        console.log(imgData)
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "/api/sign-s3?file-name=" + imgData.name + "&file-type=" + imgData.type);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    console.log(imgData.name)
                    console.log(imgData.type)
                    console.log(response.signedRequest);
                    this.upLoadImage(imgData, response.signedRequest, response.url);
                } else {
                    console.log("failure")
                    alert('Could not get signed URL.');
                }
            }
        };
        xhr.send();
    }

    upLoadImage = (file, signedRequest, url) => {
        console.log(file)
        console.log(signedRequest)
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', signedRequest);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    // alert("Upload Complete");
                    this.setState({ pet_image_url: url })
                    this.setState({ loading: false })
                    this.submitNewPet()
                } else {
                    console.log(xhr.responseText)
                    alert('Could not upload file.');
                }
            }
        };
        xhr.send(file);
    }


    getPetImage = event => {
        console.log(event.target.files[0])
        this.setState({
            pet_image: URL.createObjectURL(event.target.files[0]),
            pet_image_Data: event.target.files[0]
        })
    }

    render() {
        return (
            <div>
                <div className="modal-body mx-2">
                    {/*Pet Name Input*/}
                    <div className="my-2">
                        <input
                            value={this.state.pet_name}
                            onChange={this.handleInputChange}
                            type="text"
                            name="pet_name"
                            id="pet_name"
                            className="form-control validate"
                            placeholder="Pet Name" />
                    </div>
                    {/* Pet Age */}
                    <div className="my-2">
                        <input
                            value={this.state.age}
                            onChange={this.handleInputChange}
                            type="number"
                            name="age"
                            id="age"
                            className="form-control validate"
                            placeholder="Pet Age" />
                    </div>
                    {/* Pet Type */}
                    <div className="my-2">
                        <input
                            value={this.state.animal_type}
                            onChange={this.handleInputChange}
                            type="text"
                            name="animal_type"
                            id="animal_type"
                            className="form-control validate"
                            placeholder="Pet Type" />
                    </div>
                    {/* Primary Vet */}
                    <div className="my-2">
                        <Select
                            value={this.primary_vet_id}
                            onChange={this.handleSelectionPrimary}
                            options={this.getVetDropSelection()}
                            name="primary_vet_id"
                        />
                    </div>
                    <div className="my-2">
                        <button type="button" className="btn btn-info" onClick={this.props.getAllVets}>Find All Vets</button><span> </span><button type="button" className="btn btn-info" onClick={this.getMyVetsDropSelection}>My Vets</button>
                    </div>
                    {/* Emergency Vet */}
                    <div className="my-2">
                        <Select
                            value={this.emergency_vet_id}
                            onChange={this.handleSelectionEmergency}
                            options={this.getVetDropSelection()}
                            name="emergency_vet_id"
                        />
                    </div>
                    <div>
                        <label htmlFor="Image">Upload Image</label>
                        <br />
                        <input
                            id="Image" 
                            type="file" 
                            accept="image/*" 
                            capture="camera" 
                            name="photo" 
                            onChange={this.getPetImage}
                            />
                    </div>
                    <br />
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <img className="img-thumbnail" id="pet-preview" src={this.state.pet_image} />
                        </div>
                    </div>
                </div>
                <div className="modal-footer d-flex justify-content-center">
                    {/* Submit Button */}
                    <button disabled={!this.state.pet_name || !this.state.age || !this.state.animal_type || !this.state.primary_vet_id || !this.state.pet_image} type="submit" onClick={this.getImageSigned} className="btn btn-deep-orange">
                        {this.state.loading ?
                            <Spinner animation="border" size="sm" />
                            : <span>Add Pet</span>}
                    </button>

                    {/* <div>
                        {this.state.loading ?
                            <Spinner animation="border" size="sm" />
                            : <span></span>}
                    </div> */}

                </div>
            </div>
        );
    }
}

export function NewPetTitle() {
    return (
        <div className="">
            <h2>New Pet</h2>
        </div>
    )
}