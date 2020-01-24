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
                    <div className="col-md-4">
                        {/* First Name  */}
                        <div>
                            First Name: {this.props.state.firstname}<a href="#" ><span className="float-right"><i class="fas fa-edit"></i></span></a>
                        </div>
                        {/* Last Name */}
                        <div>
                            Last Name: {this.props.state.lastname}<a href="#" ><span className="float-right"><i class="fas fa-edit"></i></span></a>
                        </div>
                        {/* Email */}
                        <div>
                            Email: {this.props.state.email}<a href="#" ><span className="float-right"><i class="fas fa-edit"></i></span></a>
                        </div>
                        {/* Password */}
                        <div>
                            Password: •••••••••••••<a href="#" ><span className="float-right"><i class="fas fa-edit"></i></span></a>
                        </div>
                    </div>

                {/* Home Settings */}
                    <div className="col-md-4">
                        {/* Home Nmae */}
                        <div>
                        </div>
                        {/* Home Address */}
                        {/* Master Key */}
                        {/* Home Key */}
                        {/* Change ADmin */}
                    </div>

                {/* Home Users Settings */}
                    <div  className="col-md-4">

                    </div>
            </div>
            </Container>
        </div>
        )
    }
}

export default Account;