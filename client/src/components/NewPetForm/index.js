import React from "react";

export function NewPetForm(props){
    return (
        <div>
            <div className="modal-body mx-2">
                {/* First Name Input */}
                <div className="my-2">
                    <input 
                        value={props.pet_name}
                        onChange = {props.handleInputChange}
                        type="text" 
                        name ="pet_name"
                        id="pet_name" 
                        className="form-control validate"
                        placeholder="Pet Name"/>
                </div>
                {/* Last Name Input */}
                <div className="my-2">
                    <input
                        value={props.lastname}
                        onChange = {props.handleInputChange}
                        type="text"
                        name="lastname"
                        id="last-name" 
                        className="form-control validate"
                        placeholder="Last Name"/>
                </div>
                {/* Username Input */}
                <div className="my-2">
                    <input 
                        value={props.username}
                        onChange = {props.handleInputChange}
                        type="text" 
                        name="username"
                        id="user-name" 
                        className="form-control validate"
                        placeholder="Username"/>
                </div>
                {/* Email Input */}
                <div className="my-2">
                    <input 
                        value={props.email}
                        onChange = {props.handleInputChange}
                        type="email" 
                        name="email"
                        id="emailid" 
                        className="form-control validate"
                        placeholder="Email"/>
                </div>
                {/* Password Input */}
                <div className="my-2">
                    <input 
                        value={props.password}
                        onChange = {props.handleInputChange}
                        type="password" 
                        name="password"
                        id="password" 
                        className="form-control validate"
                        placeholder="Password"/>
                </div>
            </div>
            <div className="modal-footer d-flex justify-content-center">
                {/* Submit Button */}
                <button type="submit" onClick={props.handleSignUpSubmit} className="btn btn-deep-orange">Sign up</button>
            </div>
        </div>
    );
}

export function NewPetTitle(){
    return(
        <div className="">
            <h2>New Pet Information</h2>
        </div>
    )
}