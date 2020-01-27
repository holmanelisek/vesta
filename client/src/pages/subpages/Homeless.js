import React, {Component} from "react";
import {Modal} from "react-bootstrap";
import {CreateHome, CreateHomeKey} from "../../components/CreateHome";
import JoinHome from "../../components/JoinHome";
import FindHome from "../../components/FindHome";
import API from "../../utils/API";
import Crypto from "crypto-random-string";
import Container from "../../components/Container"
import { Redirect } from "react-router";

const abbrStates = ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'];
console.log("[NewVetForm]")
const stateDropSelection = abbrStates.map(state => ({ value: state, label: state }))

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

    //Function to join users to this home
    handleJoinSubmit = () => {
        //Api call to find user by id then inserting home id into the home_id field in database
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

    //Find home information by invitation key aka home key
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

    //Function to create a random home key using Crypto
    handleCreateSubmit = event => {
        event.preventDefault();
        this.setState({
            homeKey: Crypto({length: 10, type: 'url-safe'}),
            modalFunc: "CreateHomeKey"
        });
    }

    //Function to send the new home information to the server
    createHomeSend = event => {
        event.preventDefault();
        //Post to our server to create a new home
        API.createNewHome({
            home_name: this.state.homeName,
            home_admin: this.props.state.user_id,
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

    //Closes current modal and resets all the states
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
            homeZip: undefined,
            us_state: undefined
        })
      }

    //Function to open the Create Home Modal
    handleCreateModal = () =>{
        this.setState({
            modalFunc: "Create",
            modalShow: true
        })
    }

    handleSelectionState = selection => {
        console.log(selection)
        this.setState({ homeState: selection.value })
    }

    //Function to open the Find Home Modal
    handleFindHomeModal = () =>{
        this.props.authenticate();
        console.log(this.props)
        this.setState({
            modalFunc: "Find Home",
            modalShow: true
        })
    }

    //Switch statement to conditionally render the modal title based on what button user pressed
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

     //Switch statement to conditionally render the modal body based on what button user pressed
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
                            handleSelectionState = {this.handleSelectionState}
                            stateDropSelection = {stateDropSelection}
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
                {this.props.authenticated ? 
                    <div>    
                        <div style={{ textAlign: "center", height: 200, clear: "both", paddingTop: 120 }} className="jumbotron">
                        <h1>Homeless</h1>
                        </div>
                        <Container>
                            <div className="row">
                                <div className="card-deck">
                                    <div className="card">
                                        <img className="card-img-top createHomeImg" id="createHomeImg" src="./assets/images/createhome.png" alt="Create a Home" />
                                        <div className="card-body">
                                            <h2>Create My Home</h2>
                                            <p2>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut condimentum sodales risus, at auctor nunc cursus at.
                                            </p2>
                                        </div>
                                        <div className="card-footer">
                                            <button className="btn btn-info" onClick={this.handleCreateModal}>Create My Home</button>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <img className="card-img-top findHomeImg" id="findHomeImg" src="./assets/images/findhome.jpg" alt="Create a Home" />
                                        <div className="card-body">
                                            <h2>Find My Home</h2>
                                            <p2>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut condimentum sodales risus, at auctor nunc cursus at.
                                            </p2>
                                        </div>
                                        <div className="card-footer">
                                            <button className="btn btn-info" onClick={this.handleFindHomeModal}>Find My Home</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Container>
                        <Modal show={this.state.modalShow} onHide={this.handleClose} backdrop='static'>
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    {this.modalTitleSwitch(this.state.modalFunc)}
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {this.modalBodySwitch(this.state.modalFunc)}
                            </Modal.Body>
                        </Modal>
                    </div>
                :
                    <Redirect to="/" />
                }
            </div>
        ) 
    }
}

export default Homeless;