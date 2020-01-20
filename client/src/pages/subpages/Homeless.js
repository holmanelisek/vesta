import React, {Component} from "react";
import Modal from "react-bootstrap/modal";
import {CreateHome, CreateHomeKey} from "../../components/CreateHome";
import JoinHome from "../../components/JoinHome";
import FindHome from "../../components/FindHome";
import API from "../../utils/API";
import Crypto from "crypto-random-string";

class Homeless extends Component{
    constructor(){
        super();

        this.state = {
            modalShow: false,
            modalFunc: undefined,
            home_id: undefined,
            homeKey: undefined, //Same as invitation key
            masterKey: undefined,
            homeName: undefined,
            homeStreet: undefined,
            homeUnit: undefined,
            homeCity: undefined,
            homeState: undefined,
            homeZip: undefined,
        };
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value.trim() });
    }

    handleJoinSubmit = () => {
        API.joinHome({
                home_id: this.state.home_id,
                user_id: this.props.state.user_id
            }).then(res=>{
                console.log(res)
                this.handleClose()
                this.props.history.push("/Homehub");
            }).catch(err=>{
                console.log(err)
            })
    }

    handleFindHome = event => {
        event.preventDefault();
        API.findHomeByInvKey(this.state.homeKey)
            .then(response=> {
                console.log(response.data)
                this.setState({
                    homeName: response.data.home_name,
                    homeCity: response.data.city,
                    homeState: response.data.state,
                    home_id: response.data.id,
                    modalFunc: "Join"
                })
            }).catch(err => {
                console.log(err)
            })
    }

    handleCreateSubmit = event => {
        event.preventDefault();
        this.setState({
            homeKey: Crypto({length: 10, type: 'url-safe'}),
            modalFunc: "CreateHomeKey"
        });
    }

    createHomeSend = event => {
        event.preventDefault();
        API.createNewHome({
            home_name: this.state.homeName,
            master_key: this.state.masterKey,
            invitation_key: this.state.homeKey,
            street: this.state.homeStreet,
            city: this.state.homeCity,
            state: this.state.homeState,
            zip: this.state.homeZip
        }).then( response => {
            this.setState({home_id: response.data.id})
            this.handleClose()
            this.handleJoinSubmit();
        })

    }

    handleClose = () =>{
        this.setState({
            modalShow: false,
            modalFunc: undefined,
            homeKey: undefined,
            masterKey: undefined,
            homeName: undefined,
            homeStreet: undefined,
            homeUnit: undefined,
            homeCity: undefined,
            homeState: undefined,
            homeZip: undefined
        })
      }

    handleCreateModal = () =>{
        this.setState({
            modalFunc: "Create",
            modalShow: true
        })
    }

    handleFindHomeModal = () =>{
        this.props.authenticate();
        console.log(this.props)
        this.setState({
            modalFunc: "Find Home",
            modalShow: true
        })
    }

    modalTitleSwitch = modal => {
        switch(modal){
            case "Join":
                return (
                    <Modal.Title>
                        <div>Join Home</div>
                    </Modal.Title>
                );
            case "Find Home":
                return (
                    <Modal.Title>
                        <div>Find Home</div>
                    </Modal.Title>
                );
            case "Create":
                return (
                    <Modal.Title>
                        <div>Create Home</div>
                    </Modal.Title>
                );
        }
    }

    modalBodySwitch = modal =>{
        switch(modal){
            case "Join":
                return (
                    <Modal.Body>
                        <JoinHome
                            homeinfo = {{
                                homeName: this.state.homeName,
                                homeCity: this.state.homeCity,
                                homeState: this.state.homeState
                            }}
                            handleInputChange = {this.handleInputChange}
                            handleJoinSubmit = {this.handleJoinSubmit}
                        />
                    </Modal.Body>
                );
            case "Find Home":
                return (
                    <Modal.Body>
                        <FindHome 
                            handleInputChange = {this.handleInputChange}
                            handleFindHome = {this.handleFindHome}
                        />
                    </Modal.Body>
                );
            case "Create":
                return (
                    <Modal.Body>
                        <CreateHome
                            handleInputChange = {this.handleInputChange}
                            handleCreateSubmit = {this.handleCreateSubmit}
                        />
                    </Modal.Body>   
                );
            case "CreateHomeKey":
                return (
                    <Modal.Body>
                        <CreateHomeKey
                            homeinfo = {{
                                homeName: this.state.homeName,
                                homeStreet: this.state.homeStreet,
                                homeCity: this.state.homeCity,
                                homeState: this.state.homeState,
                                homeZip: this.state.homeZip,
                                homeUnit: this.state.homeUnit,
                                homeKey: this.state.homeKey,
                            }}
                            handleInputChange = {this.handleInputChange}
                            createHomeSend = {this.createHomeSend}
                        />
                    </Modal.Body>  
                );
            case undefined:
                return null
        }
    }

    render(){
        return(
            <div>    
                <div style={{ textAlign: "center", height: 200, clear: "both", paddingTop: 120 }} className="jumbotron">
                <h1>Homeless</h1>
                </div>
                <div>
                    <button onClick={this.handleCreateModal}>Create New Home</button>
                    <button onClick={this.handleFindHomeModal}>Find a Home</button>
                </div>
                <Modal show={this.state.modalShow} onHide={this.handleClose} backdrop='static'>
                    <Modal.Header closeButton>
                        {this.modalTitleSwitch(this.state.modalFunc)}
                    </Modal.Header>
                    <Modal.Body>
                        {this.modalBodySwitch(this.state.modalFunc)}
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default Homeless;