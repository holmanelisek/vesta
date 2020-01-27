import React from "react";
import { Alert } from 'react-bootstrap'

function SignIn(props) {
    return (
        <div>
            <div className="form-group">
                <div className="modal-body mx-3">
                    {/* Username Input */}
                    <form>
                        <div className="md-form mb-5">
                            <input
                                value={props.username}
                                onChange={props.handleInputChange}
                                type="text"
                                name="email"
                                id="email"
                                className="form-control"
                                placeholder="Email" />
                        </div>
                        {/* Password Input */}
                        <div className="md-form mb-4">
                            <input
                                value={props.password}
                                onChange={props.handleInputChange}
                                type="password"
                                name="password"
                                id="passwords"
                                className="form-control"
                                placeholder="Password" />
                        </div>
                    </form>
                </div>
            </div>
            <div className="modal-footer d-flex justify-content-center">
                {/* Submit form button */}
                <button type="submit" onClick={props.handleFormSubmit} className="btn btn-default">Login</button>
            </div>
            <div>
                {props.signInErrResponse ? <Alert variant="danger" className="text-center">Your email or password is wrong. Please try again</Alert> : <span></span>}
            </div>
        </div>
    );
}

export default SignIn;