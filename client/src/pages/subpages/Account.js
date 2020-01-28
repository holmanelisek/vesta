import React, { Component} from "react";
import API from "../../utils/API";
import { Redirect } from "react-router-dom";
import { Modal} from "react-bootstrap";
import {
    HouseMemeber,
    UpdateEmail, 
    UpdateFirstName, 
    UpdateLastName, 
    UpdatePassword, 
    UpdateHomeName,
    UpdateHomeAddress,
    UpdateMasterKey,
    UpdateHomeKey,
    UpdateAdmin,
} from "../../components/AccountComponent";
import Crypto from "crypto-random-string";

class Account extends Component{
    constructor(){
        super()
         
        this.state = {
            mondalFunc: undefined,
            modalShow: false,
            user_id: undefined,
            home_id: undefined,
            home_name: undefined,
            home_street: undefined,
            home_city: undefined,
            home_state: undefined,
            home_zip: undefined,
            first_name: undefined,
            last_name: undefined,
            email: undefined,
            home_members: [],
            members_selection: [],
            old_password: undefined,
            password: undefined,
            password_confirm: undefined,
            home_key: undefined,
            master_key: undefined,
            new_master_key: undefined,
            admin_name: undefined,
            admin_id: undefined,
            new_admin_id: undefined,
            onSubmitErr: "",
            updateSwitch: false,
            update_point_current: undefined,
            update_point_member: undefined,
            update_point_name: undefined,
            update_point_newTotal: undefined,
        }
    }
    
    componentDidMount(){
        console.log("Component Did Mount")
        if (this.props.authenticated) {
            this.getHomeMembers(this.props.state.home_id);
        }
        if( this.props.authenticated && this.props.state.home_admin === this.props.state.user_id){
            this.getMasterKey(this.props.state.home_id, this.props.state.user_id);
        }
    }

    resetInfo = () => {
        this.setState({
            home_street: this.props.state.home_street,
            home_city: this.props.state.home_city,
            home_state: this.props.state.home_state,
            home_zip: this.props.state.home_zip,
            old_password: undefined,
            password: undefined,
            password_confirm: undefined,
            new_master_key: undefined,
            home_key: undefined,
            new_admin_id: undefined,
            update_point_current: undefined,
            update_point_member: undefined,
            update_point_name: undefined,
        })
    }

    getMasterKey = (home_id, user_id) =>{
        console.log("[Account.js getMasterKey]")
        API.findHomeMasterKey({
            home_id: home_id,
            user_id: user_id
        }).then( response => {
            console.log("[Account.js getMasterKey - Complete]")
            this.setState({
                master_key: response.data.master_key,
                new_master_key: response.data.master_key,
                admin_id: this.props.state.home_admin
            })
        }).catch( err => {
            console.log(err.response)
        })
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value.trim() });
      };

    getHomeMembers = homeId => {
        console.log("[Account.js getHomeMembers]")
        API.getAllHomeUsers({home_id: homeId})
          .then(response => {
            console.log("[Account.js getHomeMember - Complete]")
            this.setState({ home_members: response.data})
            this.setState({
                home_street: this.props.state.home_street,
                home_city: this.props.state.home_city,
                home_state: this.props.state.home_state,
                home_zip: this.props.state.home_zip,
                home_name: this.props.state.home_name,
                home_key: this.props.state_home_key,
            })
            this.findAdminName(this.props.state.home_admin);
            this.buildMembersSelection(response.data);
          }).catch(err => {
            console.log(err)
          })
      }

    findAdminName = adminId =>{
        let adminName = this.state.home_members.find(({id}) => id === adminId)
        this.setState({ admin_name: adminName.first_name});
    }

    buildMembersSelection = array => {
        let selection = array.map(member => ({value: member.id, label: (member.first_name+" "+member.last_name)}))
        this.setState({ members_selection: selection})
    }

    updateMemberPoint = (member, points) => {
        console.log("[Account.js Update Member Points]")
        console.log(member)
        console.log(points)
        let userData = {
            field: "points",
            value: points,
            user_id: member
        }
        API.updateUserInfo(userData)
        .then(response => {
            console.log("[Account.js Update Member Points - Complete]")
            this.props.authenticate();
            this.getHomeMembers(this.props.state.home_id)
        })
    }

    handleAccountInfoChange = event =>{
        console.log("[Account.js handleAccountInfoChange]")
        event.preventDefault();
        let userData ={
            field: event.target.name,
            value: this.state[event.target.name],
            user_id: this.props.state.user_id
        }
        API.updateUserInfo(userData)
        .then(response => {
            console.log("[Account.js handleAccountInfoChange - Complete]")
            this.closeModal();
            this.props.authenticate();
        })
    }

    handleSelectionMember = selection => {
        //console.log(selection.value)
        this.setState({ new_admin_id: selection.value })
    }

    handleHomeInfoChange = event =>{
        event.preventDefault();
        if( this.props.state.user_id === this.props.state.home_admin){
            console.log("[Account.js handleHomeInfoChange]")
            API.updateHomeAddress({
                home_name: this.props.state.home_name,
                home_street: this.state.home_street,
                home_city: this.state.home_city,
                home_state: this.state.home_state,
                home_zip: this.state.home_zip,
                home_id: this.props.state.home_id,
                master_key: this.state.new_master_key,
                home_key: this.state.home_key,
                home_admin: this.state.new_admin_id,
            }).then( response => {
                console.log(response.data)
                this.props.authenticate();
                this.props.getHomeInformation(this.props.state.home_id);
                if (this.state.new_admin_id){
                    this.findAdminName(this.state.admin_id)
                }
                if(this.state.new_master_key && this.props.state.home_admin === this.props.state.user_id){
                    this.getMasterKey(this.props.state.home_id, this.props.state.user_id);
                }else{
                }
                this.closeModal();
            }).catch( err => {
                console.log(err.response)
            })
        }else{
            alert("Access Denied");
        }
    }

    generateHomeKey = event => {
        event.preventDefault()
        this.setState({
            home_key: Crypto({length: 10, type: 'url-safe'})
        })
        
    }

    removeMember = (id, first_name) => {
        //console.log(id)
        //console.log(first_name)
        API.removeMember({
            user_id: id
        }).then( response => {
            console.log(response.data)
            this.getHomeMembers(this.props.state.home_id)
        })
    }

    handleAccountPasswordChange = event =>{
        event.preventDefault();
        //console.log(this.state.password)
        //console.log(this.state.password_confirm)
        if(this.state.password === this.state.password_confirm){
            console.log("[Password Matches]")
            let userData ={
                old_password: this.state.old_password,
                password: this.state.password,
                user_id: this.props.state.user_id
            }
            API.updateAccountPass(userData)
            .then(response => {
                console.log("[New Password Hash]")
                console.log(response)
                this.closeModal();
                this.props.authenticate();
            })
        }else{
            this.setState({ onSubmitErr: "border border-warning"})
            console.log("[Password doesn't match]")
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
        this.setState({ 
            modalShow: false,
            onSubmitErr: ""
        });
        this.resetInfo();
    }
    switchModalTitle = field =>{
        switch (field){
            case "firstName":
                return(
                    <div>
                        <h2>Update First Name</h2>
                    </div>
                );
            case "lastName":
                return(
                    <div>
                        <h2>Update Last Name</h2>
                    </div>
                );
            case "email":
                return(
                    <div>
                        <h2>Update Email</h2>
                    </div>
                );
            case "password":
                return(
                    <div>
                        <h2>Update Password</h2>
                    </div>
                );
            case "homeName":
                return(
                    <div>
                        <h2>New Home Name</h2>
                    </div>
                );
            case "homeAddress":
                return(
                    <div>
                        <h2>New Home Address</h2>
                    </div>
                );
            case "homeKey":
                return(
                    <div>
                        <h2>New Home Key</h2>
                    </div>
                );
            case "masterKey":
                return(
                    <div>
                        <h2>New Master key</h2>
                    </div>
                );
            case "admin":
                return(
                    <div>
                        <h2>Change Home Administrator</h2>
                    </div>
                );
            default:
                return(<div></div>);
        }
    }

    switchEditFunction = field =>{
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
            case "homeName":
                return(
                    <UpdateHomeName
                        onSubmitErr = {this.state.onSubmitErr} 
                        handleInputChange = {this.handleInputChange}
                        handleHomeInfoChange = {this.handleHomeInfoChange}
                    />
                );
            case "homeAddress":
                return(
                    <UpdateHomeAddress
                        onSubmitErr = {this.state.onSubmitErr}
                        handleInputChange = {this.handleInputChange}
                        handleHomeInfoChange = {this.handleHomeInfoChange}
                        oldhome_street= {this.props.state.home_street}
                        oldhome_city= {this.props.state.home_city}
                        oldhome_state= {this.props.state.home_state}
                        oldhome_zip= {this.props.state.home_zip}
                    />
                );
            case "homeKey":
                return(
                    <UpdateHomeKey
                        home_key= {this.state.home_key}
                        handleInputChange = {this.handleInputChange}
                        handleHomeInfoChange = {this.handleHomeInfoChange}
                        generateHomeKey = {this.generateHomeKey}
                    />
                );
            case "masterKey":
                return(
                    <UpdateMasterKey
                        handleInputChange = {this.handleInputChange}
                        handleHomeInfoChange = {this.handleHomeInfoChange}
                    />
                );
            case "admin":
                return(
                    <UpdateAdmin
                        members = {this.state.members_selection}
                        onSubmitErr = {this.state.onSubmitErr} 
                        handleSelectionMember = {this.handleSelectionMember}
                        handleHomeInfoChange = {this.handleHomeInfoChange}
                    />
                );
            default:
                return(<div></div>);
        }
    }

    render(){  
        return(
            <div>
            {this.props.authenticated ? 
                <div>
                    {/* Title Div */}
                        <div className="jumbotron" id="account-jumbo">
                            <h1>Account Settings</h1>
                        </div>
                    <div className="container-fuild m-2">
                    <div className="row justify-content-center">
                    {/* User Account Settings */}
                        <div className="col-xl col-md-5 m-2">
                            <div><h4>Account Information</h4></div>
                            <div className="border border-rounded p-4">
                                {/* First Name  */}
                                <div>
                                    <b>First Name:</b> {this.props.state.firstname}<a href="#" onClick={() => this.openModal("firstName")} ><span className="float-right"><i className="fas fa-edit fa-2x"></i></span></a>
                                </div>
                                <hr />
                                {/* Last Name */}
                                <div>
                                    <b>Last Name:</b> {this.props.state.lastname}<a href="#" onClick={() => this.openModal("lastName")}><span className="float-right"><i className="fas fa-edit fa-2x"></i></span></a>
                                </div>
                                <hr />
                                {/* Email */}
                                <div>
                                    <b>Email:</b> {this.props.state.email}<a href="#" onClick={() => this.openModal("email")} ><span className="float-right"><i className="fas fa-edit fa-2x"></i></span></a>
                                </div>
                                <hr />
                                {/* Password */}
                                <div>
                                    <b>Password:</b> •••••••••••••<a href="#" onClick={() => this.openModal("password")} ><span className="float-right"><i className="fas fa-edit fa-2x"></i></span></a>
                                </div>
                            </div>
                        </div>

                    {/* Home Settings */}
                        <div className="col-xl col-md-5 m-2">
                            <div><h4>Home Information</h4></div>
                            <div className="border border-rounded p-4"> 
                                {/* Home Nmae */}
                                <div>
                                    <b>Home Name:</b> {this.props.state.home_name}
                                        {(this.props.state.home_admin === this.props.state.user_id) ? 
                                            <a href="#" onClick={() => this.openModal("homeName")}><span className="float-right"><i className="fas fa-edit fa-2x"></i></span></a>
                                        :
                                            null
                                        }
                                </div>
                                <hr />
                                {/* Home Address */}
                                <div>
                                    <div>
                                        <b>Home Address</b>
                                        {(this.props.state.home_admin === this.props.state.user_id) ? 
                                            <a href="#" onClick={() => this.openModal("homeAddress")}><span className="float-right"><i className="fas fa-edit fa-2x"></i></span></a>
                                        :null}
                                    </div>
                                    <div className="ml-3">
                                        <div>{this.props.state.home_street}</div>
                                        <div>{this.props.state.home_city}, {this.props.state.home_state} {this.props.state.home_zip}</div>
                                    </div>
                                </div>
                                <hr />
                                {/* Master Key */}
                                <div>
                                    {(this.props.state.home_admin === this.props.state.user_id) ? 
                                        <div>
                                            <b>Master Key:</b> {this.state.master_key}<a href="#" onClick={() => this.openModal("masterKey")}><span className="float-right"><i className="fas fa-edit fa-2x"></i></span></a>
                                        </div>
                                    :null }
                                </div>
                                <hr />
                                {/* Home Key */}
                                <div>
                                    <b>Home Key:</b> {this.props.state.home_key}
                                    {(this.props.state.home_admin === this.props.state.user_id) ? 
                                        <a href="#" onClick={() => this.openModal("homeKey")}><span className="float-right"><i className="fas fa-edit fa-2x"></i></span></a>
                                    :null}
                                </div>
                                <hr />
                                {/* Admin */}
                                <div>
                                    <b>Administrator:</b> {this.state.admin_name}
                                    {(this.props.state.home_admin === this.props.state.user_id) ? 
                                        <a href="#" onClick={() => this.openModal("admin")}><span className="float-right"><i className="fas fa-edit fa-2x"></i></span></a>
                                    :null}
                                </div>
                            </div>
                        </div>

                    {/* Home Users Settings */}
                        <div  className="col-xl col-lg-10 col-md-10 m-2">
                            <div><h4>Home Members</h4></div>
                            <div className="">
                                {this.state.home_members.map(member => (
                                    <HouseMemeber
                                        key = {member.id}
                                        member = {member}
                                        user_id = {this.props.state.user_id}
                                        home_admin = {this.props.state.home_admin}
                                        openModal = {this.openModal}
                                        removeMember = {this.removeMember}
                                        updateMemberPoint = {this.updateMemberPoint}
                                        home_id = {this.props.state.home_id}
                                        getAllHomeUsers = {this.getHomeMembers}
                                    />
                                ))}
                            </div>
                        </div>
                </div>
                </div>

                <Modal show={this.state.modalShow} onHide={this.closeModal} backdrop='static'>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {this.switchModalTitle(this.state.modalFunc)}
                        </Modal.Title>
                    </Modal.Header>
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