import React, { Component } from "react";

class SignIn extends Component {
    
    render(){
        return (
            //Modal
            <div className="modal fade" id="modalLoginForm" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <h4 className="modal-title w-100 font-weight-bold">Sign in</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="form-group">
                            <div className="modal-body mx-3">
                                {/* Username Input */}
                                <div className="md-form mb-5">
                                    <input 
                                        value={this.props.username}
                                        onChange = {this.props.handleInputChange}
                                        type="text"
                                        name="email"
                                        id="email" 
                                        className="form-control"
                                        placeholder="Email"/>
                                </div>
                                {/* Password Input */}
                                <div className="md-form mb-4">
                                    <input 
                                        value={this.props.password}
                                        onChange = {this.props.handleInputChange}
                                        type="password" 
                                        name="password"
                                        id="passwords" 
                                        className="form-control"
                                        placeholder="Password"/>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer d-flex justify-content-center">
                            {/* Submit form button */}
                            <button type="submit" onClick={this.props.handleFormSubmit} className="btn btn-default">Login</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignIn;