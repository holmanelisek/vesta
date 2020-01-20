import React, {Component} from "react";
import Modal from "react-bootstrap/modal";
import CreateHome from "../../components/CreateHome";
import JoinHome from "../../components/JoinHome";
import FindHome from "../../components/FindHome";
import API from "../../utils/API";

class Homeless extends Component{
    constructor(){
        super();

        this.state = {
            modalShow: false,
            modalFunc: undefined,
            home_id: undefined,
            homeKey: undefined,
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

    handleJoinSubmit = event => {
        event.preventDefault();
        API.joinHome({
            home_id: this.state.home_id,
            user_id: this.props.state.user_id
        }).then(res=>{
            console.log(res)
            this.handleClose()
            this.props.history.push("/Homehub");
        }).catch(err=>{

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
                console.log(err.data)
        })
    }

    handleCreateSubmit = event => {
        event.preventDefault();
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
        this.setState({
            modalFunc: "Find Home",
            modalShow: true
        })
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
                        <Modal.Title>
                            {this.state.modalFunc === "Create" ?
                                <div>Create Home</div>
                                :this.state.modalFunc === "Join" ? 
                                    <div>Join Home</div>
                                    :this.state.modalFunc === "Find Home" ?
                                        <div>Find Home</div>
                                        :null
                            }
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                            {this.state.modalFunc === "Create" ?
                                <CreateHome
                                    handleInputChange = {this.handleInputChange}
                                    handleCreateSubmit = {this.handleCreateSubmit}
                                />
                                :this.state.modalFunc === "Join" ? 
                                    <JoinHome
                                        homeinfo = {{
                                            homeName: this.state.homeName,
                                            homeCity: this.state.homeCity,
                                            homeState: this.state.homeState
                                        }}
                                        handleInputChange = {this.handleInputChange}
                                        handleJoinSubmit = {this.handleJoinSubmit}
                                    />
                                    :this.state.modalFunc === "Find Home" ? 
                                        <FindHome 
                                            handleInputChange = {this.handleInputChange}
                                            handleFindHome = {this.handleFindHome}
                                        />
                                        :null
                            }
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default Homeless;