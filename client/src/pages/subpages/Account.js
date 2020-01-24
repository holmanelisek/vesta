import React, { Component } from "react";
import API from "../../utils/API";
import { Modal } from "react-bootstrap";
import Container from "../../components/Container"

class Account extends Component{

    state ={
        user_id: undefined,
        home_id: undefined,
        first_name: undefined,
        last_name: undefined,
        email: undefined
    }

    render(){  
        return(
            <div>
                {/* Title Div */}
                    <div style={{ textAlign: "center", height: 200, clear: "both", paddingTop: 120 }} className="jumbotron">
                        <h1>Account Settings</h1>
                    </div>
                <Container>
                <div className="row">
                {/* User Account Settings */}
                    <div className="col-md-4 m-2">
                        <div>Account Information</div>
                        <div className="border border-rounded p-2">
                            {/* First Name  */}
                            <div>
                                First Name: {this.props.state.firstname}<a href="#" ><span className="float-right"><i className="fas fa-edit"></i></span></a>
                            </div>
                            {/* Last Name */}
                            <div>
                                Last Name: {this.props.state.lastname}<a href="#" ><span className="float-right"><i className="fas fa-edit"></i></span></a>
                            </div>
                            {/* Email */}
                            <div>
                                Email: {this.props.state.email}<a href="#" ><span className="float-right"><i className="fas fa-edit"></i></span></a>
                            </div>
                            {/* Password */}
                            <div>
                                Password: •••••••••••••<a href="#" ><span className="float-right"><i className="fas fa-edit"></i></span></a>
                            </div>
                        </div>
                    </div>

                {/* Home Settings */}
                    <div className="col-md-4 m-2">
                        <div> Home Information</div>
                        <div className="border border-rounded p-2"> 
                            {/* Home Nmae */}
                            <div>
                                Home Name: {this.props.state.home_name}<a href="#" ><span className="float-right"><i className="fas fa-edit"></i></span></a>
                            </div>
                            {/* Home Address */}
                            <div>
                                <div>Home Address<a href="#" ><span className="float-right"><i className="fas fa-edit"></i></span></a></div>
                                <div className="ml-3">
                                    <div>{this.props.state.home_street}</div>
                                    <div>{this.props.state.home_city}, {this.props.state.home_state} {this.props.state.home_zip}</div>
                                </div>
                            </div>
                            {/* Master Key */}
                            <div>

                            </div>
                            {/* Home Key */}
                            <div>
                                Home Key: {this.props.state.home_key}<a href="#" ><span className="float-right"><i className="fas fa-edit"></i></span></a>
                            </div>
                            {/* Admin */}
                            <div>
                                Administrator: {this.props.state.home_admin}<a href="#" ><span className="float-right"><i className="fas fa-edit"></i></span></a>
                            </div>
                        </div>
                    </div>

                {/* Home Users Settings */}
                    <div  className="col-md-4 m-2">
                        <div>Home Members</div>
                        <div className="border border-rounded p-2">
                            <div>

                            </div>
                        </div>
                    </div>
            </div>
            </Container>
        </div>
        )
    }
}

export default Account;