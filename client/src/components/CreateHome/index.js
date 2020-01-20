import React from "react";

function CreateHome(props){
    return (        
        <div>
            <div className="modal-body mx-2">
                {/* Home Name */}
                <div className="my-2">
                    <label htmlFor="homeName">Home Name</label>
                    <input 
                        value={props.homeName}
                        onChange = {props.handleInputChange}
                        type="text" 
                        name ="homeName"
                        id="homeName" 
                        className="form-control validate"
                        placeholder="Home Name"
                        required/>
                </div>
                {/* Home Street */}
                <div className="my-2">
                    <label htmlFor="homeStreet">Street Address</label>
                    <input
                        value={props.homeStreet}
                        onChange = {props.handleInputChange}
                        type="text"
                        name="homeStreet"
                        id="homeStreet" 
                        className="form-control validate"
                        placeholder="Street Address"/>
                </div>
                {/* Home Unit/Apt Number*/}
                <div className="my-2">
                    <label htmlFor="homeUnit">Home Apt#/ Unit#</label>
                    <input 
                        value={props.homeUnit}
                        onChange = {props.handleInputChange}
                        type="text" 
                        name="homeUnit"
                        id="homeUnit" 
                        className="form-control validate"
                        placeholder="Home Apt#/ Unit#"/>
                </div>
                {/* Home City */}
                <div className="my-2">
                    <label htmlFor="homeCity">City</label>
                    <input 
                        value={props.homeCity}
                        onChange = {props.handleInputChange}
                        type="text" 
                        name="homeCity"
                        id="homeCity" 
                        className="form-control validate"
                        placeholder="City"/>
                </div>
                {/* Home State */}
                <div className="my-2">
                    <label htmlFor="homeState">State</label>
                    <input 
                        value={props.homeState}
                        onChange = {props.handleInputChange}
                        type="text" 
                        name="homeState"
                        id="homeState" 
                        className="form-control validate"
                        placeholder="Home State"/>
                </div>
                {/* Home Zip */}
                <div className="my-2">
                    <label htmlFor="homeZip">Zip Code</label>
                    <input 
                        value={props.homeZip}
                        onChange = {props.handleInputChange}
                        type="number" 
                        name="homeZip"
                        id="homeZip" 
                        className="form-control validate"
                        placeholder="Zip Code"/>
                </div>
            </div>
            <div className="modal-footer d-flex justify-content-center">
                {/* Submit Button */}
                <button type="submit" onClick={props.handleCreateSubmit} className="btn btn-deep-orange">Sign up</button>
            </div>
        </div>)
}

export default CreateHome;