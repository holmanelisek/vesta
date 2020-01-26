import React, { Component, memo } from "react";
import API from "../../utils/API";
import { Redirect } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Container from "../../components/Container"
import {HouseMemeber,UpdateEmail, UpdateFirstName, UpdateLastName, UpdatePassword} from "../../components/AccountComponent";

class Account extends Component{
    constructor(){
        super()
         
        this.state = {
            mondalFunc: undefined,
            modalShow: false,
            user_id: undefined,
            home_id: undefined,
            first_name: undefined,
            last_name: undefined,
            email: undefined,
            home_members: [],
            password: undefined,
            password_confirm: undefined,
            admin_name: undefined,
            onSubmitErr: "",
            updateSwitch: false
        }
    }
    
    componentDidMount(){
        console.log("Account: Auth");
        if (this.props.authenticate) {
            console.log("Accounts: Passed")
            this.getHomeMembers(this.props.state.home_id);
        }
    }
    
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value.trim() });
      };

    getHomeMembers = homeId => {
        API.getAllHomeUsers({home_id: homeId})
          .then(response => {
            this.setState({ home_members: response.data})
            this.findAdminName(this.props.state.home_admin);
          }).catch(err => {
            console.log(err)
          })
      }

    findAdminName = adminId =>{
        console.log(adminId)
        console.log(this.state.home_members)
        let adminName = this.state.home_members.find(({id}) => id === adminId)
        console.log(adminName);
        this.setState({ admin_name: adminName.first_name});
    }

    handleAccountInfoChange = event =>{
        event.preventDefault();
        let userData ={
            field: event.target.name,
            value: this.state[event.target.name],
            user_id: this.props.state.user_id
        }
        API.updateUserInfo(userData)
        .then(response => {
            console.log(response)
            this.closeModal();
            this.props.authenticate();
        })
    }

    handleAccountPasswordChange = () =>{
        if(this.state.password === this.password_confirm){

        }else{
            this.setState({ onSubmitErr: "border border-warning"})
            console.log("Change Password")
            console.log(this.state.password)
            console.log(this.state.password_confirm)
            //console.log(this.state.onSubmitErr)
            setTimeout(()=>{
                console.log(this.state.onSubmitErr)
            },1000)
        }
    }

    openModal = modalFunc => {
        this.setState({ modalFunc: modalFunc })
        this.setState({ modalShow: true });
    }

    closeModal = () => {
        this.setState({ modalShow: false });
    }

    switchEditFunction = field =>{
        console.log("[switchEditFucntion")
        console.log(field)
        switch (field){
            case "firstName":
                return(
                    <UpdateFirstName 
                        handleInputChange = {this.handleInputChange}
                        handleAccountInfoChange = {this.handleAccountInfoChange}
                    />
                );
            case "lastName":
                return(
                    <UpdateLastName 
                        handleInputChange = {this.handleInputChange}
                        handleAccountInfoChange = {this.handleAccountInfoChange}
                    />
                );
            case "email":
                return(
                    <UpdateEmail
                        password = {this.state.password}
                        handleInputChange = {this.handleInputChange}
                        handleAccountInfoChange = {this.handleAccountInfoChange}
                    />
                );
            case "password":
                return(
                    <UpdatePassword
                        onSubmitErr = {this.state.onSubmitErr} 
                        handleInputChange = {this.handleInputChange}
                        handleAccountPasswordChange = {this.handleAccountPasswordChange}
                    />
                );
        }
    }

    render(){  
        return(
            <div>
            {this.props.authenticated ? 
                <div>
                    {/* Title Div */}
                        <div style={{ textAlign: "center", height: 200, clear: "both", paddingTop: 120 }} className="jumbotron">
                            <h1>Account Settings</h1>
                        </div>
                    <Container>
                    <div className="row">
                    {/* User Account Settings */}
                        <div className="col-md m-2">
                            <div>Account Information</div>
                            <div className="border border-rounded p-2">
                                {/* First Name  */}
                                <div>
                                    First Name: {this.props.state.firstname}<a href="#" onClick={() => this.openModal("firstName")} ><span className="float-right"><i className="fas fa-edit"></i></span></a>
                                </div>
                                {/* Last Name */}
                                <div>
                                    Last Name: {this.props.state.lastname}<a href="#" onClick={() => this.openModal("lastName")}><span className="float-right"><i className="fas fa-edit"></i></span></a>
                                </div>
                                {/* Email */}
                                <div>
                                    Email: {this.props.state.email}<a href="#" onClick={() => this.openModal("email")} ><span className="float-right"><i className="fas fa-edit"></i></span></a>
                                </div>
                                {/* Password */}
                                <div>
                                    Password: •••••••••••••<a href="#" onClick={() => this.openModal("password")} ><span className="float-right"><i className="fas fa-edit"></i></span></a>
                                </div>
                            </div>
                        </div>

                    {/* Home Settings */}
                        <div className="col-md m-2">
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
                                    Administrator: {this.state.admin_name}<a href="#" ><span className="float-right"><i className="fas fa-edit"></i></span></a>
                                </div>
                            </div>
                        </div>

                    {/* Home Users Settings */}
                        <div  className="col-md m-2">
                            <div>Home Members</div>
                            <div className="border border-rounded p-2">
                                {this.state.home_members.map(member => (
                                    <HouseMemeber
                                        key = {member.id}
                                        member = {member}
                                    />
                                ))}
                            </div>
                        </div>
                </div>
                </Container>

                <Modal show={this.state.modalShow} onHide={this.closeModal} backdrop='static'>
                    <Modal.Title>
                    </Modal.Title>
                    <Modal.Body>
                        {this.switchEditFunction(this.state.modalFunc)}
                    </Modal.Body>
                    <Modal.Footer>
                        <div>
                            <button type="button" className="btn btn-secondary" onClick={this.closeModal}>Close</button>
                        </div>
                    </Modal.Footer>
                </Modal>

            </div>
            :
                <Redirect to="/" />
            }
            </div>
        )
    }
}

export default Account;