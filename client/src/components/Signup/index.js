import React from "react";
import { Alert } from 'react-bootstrap'

function SignUp(props) {
    return (
        < div >
            <div className="modal-body mx-2">
                {/* First Name Input */}
                <div className="my-2">
                    <input
                        value={props.firstname}
                        onChange={props.handleInputChange}
                        type="text"
                        name="firstname"
                        id="first-name"
                        className="form-control validate"
                        placeholder="First Name" />
                </div>
                {/* Last Name Input */}
                <div className="my-2">
                    <input
                        value={props.lastname}
                        onChange={props.handleInputChange}
                        type="text"
                        name="lastname"
                        id="last-name"
                        className="form-control validate"
                        placeholder="Last Name" />
                </div>
                {/* Username Input */}
                <div className="my-2">
                    <input
                        value={props.username}
                        onChange={props.handleInputChange}
                        type="text"
                        name="username"
                        id="user-name"
                        className="form-control validate"
                        placeholder="Username" />
                </div>
                {/* Email Input */}
                <div className="my-2">
                    <input
                        value={props.email}
                        onChange={props.handleInputChange}
                        type="email"
                        name="email"
                        id="emailid"
                        className="form-control validate"
                        placeholder="Email" />
                </div>
                {/* Password Input */}
                <div className="my-2">
                    <input
                        value={props.password}
                        onChange={props.handleInputChange}
                        type="password"
                        name="password"
                        id="password"
                        className="form-control validate"
                        placeholder="Password" />
                </div>
            </div>
            <div className="modal-footer d-flex justify-content-center">
                {/* Submit Button */}
                <button type="submit" onClick={props.handleSignUpSubmit} className="btn btn-deep-orange">Sign up</button>
            </div>
            {/* <Alert variant="danger">
                This is a danger alert—check it out!
             </Alert> */}
            <div>
                {props.formNotFilledErrResponse ? <Alert variant="danger" className="text-center">Please fill out all fields</Alert> : <span></span>}
                {props.emailUserErrResponse ? <Alert variant="danger" className="text-center">This email is already in use. Please log in or try a different email.</Alert> : <span></span>}
                {props.emailValidationErrResponse ? <Alert variant="danger" className="text-center">Please enter a valid email address</Alert> : <span></span>}
            </div>
        </div >
    );
}

export default SignUp;