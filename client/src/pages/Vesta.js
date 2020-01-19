import React, { Component } from "react";
import  { Route, Link, Switch} from 'react-router-dom'
import ScrollspyNav from "react-scrollspy-nav";
import Navbar from "../components/Navbar";
import SignIn from "../components/SignIn";
import SignUp from "../components/Signup";
import Home from "./subpages/Home";
import Homehub from "./subpages/Homehub";
import NoMatch from "./subpages/NoMatch";
import Footer from "../components/Footer";
import Modal from 'react-bootstrap/Modal';
import API from "../utils/API";

class Vesta extends Component {
  constructor(){
    super();

    this.state = {
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      email: "",
      authenticated: false,
      modalShow: false,
      modalFunc: true
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleSignInShow = this.handleSignInShow.bind(this);
  }

  componentDidMount(){
      this.authentication();
  }

  authentication = () => {
      API.isSignedIn().then(res => {
          //If res.email is true then render this menu
          if(res.data.id && !this.state.authenticated){
              this.setState({authenticated: true});
          //If res.email is not true render this menu
          }
      }).catch();
  }

  //Function to change the state values on input change
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value.trim() });
  };

  //Function for 
  handleSignInSubmit = event => {
    event.preventDefault();
    //API post for signing in
    API.signIn({
      //This is the data the API server requires for signing in, change them based on the what the server requires.
      email: this.state.email,
      password: this.state.password
    }).then(response => {
        //console.log(response.data)
        if(response.data.username){
          this.setState({authenticated: true});
          this.handleClose()
          this.props.history.push("/Homehub")
        }
    }).catch(err => {
      //Do something with the err
      //console.log(err)
    })
  };

  //Function for signing up
  handleSignUpSubmit = event => {
    event.preventDefault();
    //API post for signing up.
    API.signUp({
        //This is the data the API server requires for signing up, change them based on the what the server requires.
        email: this.state.email,
        password: this.state.password,
        username: this.state.username,
        fName: this.state.firstname,
        lName: this.state.lastname
      }).then( response => {
        this.setState({authenticated: true});
        this.handleClose()
        this.props.history.push("/Homehub")
      }).catch( err => {
        //Do something with error
    });
  }

  handleSignOutSubmit = () => {
    API.signOut()
      .then( res => {
          this.setState({authenticated: false});
          this.props.history.push("/")
        })
  }


  handleClose = () =>{
    this.setState({modalShow: false})
  }

  handleSignInShow = () =>{
    this.setState({modalFunc: true})
    this.setState({modalShow: true})
  }

  handleSignUpShow = () =>{
    this.setState({modalFunc: false})
    this.setState({modalShow: true})
  }

  render() {
    return (
      <div>
        {/* Navbar Component */}
        <ScrollspyNav
            scrollTargetIds={["page-top","about", "services", "team"]}
            offset={-56}
            activeNavClass="is-active"
            scrollDuration="400"
            headerBackground="true"
            router='Route'
        >
          <Navbar 
            authenticated={this.state.authenticated} 
            clickModalSignIn = {this.handleSignInShow}
            clickModalSignUp = {this.handleSignUpShow}
            clickSignout = {this.handleSignOutSubmit}
          />
        </ScrollspyNav>

        {/* Page Content Routes */}
        <div id="page-top">
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/Homehub" exact render={props => (<Homehub {...props} authenticated={this.state.authenticated}/>)}/>
          <Route component={NoMatch}/>
        </Switch>
        </div>
        <Footer />

        {/* SignIn Component */}
        <Modal show={this.state.modalShow} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              { this.state.modalFunc ?
                <div>Sign In</div>:<div>Sign Up</div>
              }</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            { this.state.modalFunc ?<SignIn
            // Passing through functions
            handleFormSubmit={this.handleSignInSubmit}
            handleInputChange={this.handleInputChange}
            />
            :
            <SignUp
            // Passing through functions
            handleSignUpSubmit={this.handleSignUpSubmit}
            handleInputChange={this.handleInputChange}
            />
            }
          </Modal.Body>
        </Modal>

        {/* SignUp Component
        <Modal show={this.state.modalShow} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Sign up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SignUp
            // Passing through functions
            handleSignUpSubmit={this.handleSignUpSubmit}
            handleInputChange={this.handleInputChange}
            />
          </Modal.Body>
        </Modal> */}
      </div>
    );
  }
}

export default Vesta;
