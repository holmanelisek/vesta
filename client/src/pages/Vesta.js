import React, { Component } from "react";
import  { Route, Link, Switch} from 'react-router-dom'
import ScrollspyNav from "react-scrollspy-nav";
import Navbar from "../components/Navbar";
import SignIn from "../components/SignIn";
import SignUp from "../components/Signup";
import Home from "./subpages/Home";
import Homeless from "./subpages/Homeless";
import Homehub from "./subpages/Homehub";
import NoMatch from "./subpages/NoMatch";
import Footer from "../components/Footer";
import Modal from 'react-bootstrap/Modal';
import API from "../utils/API";

class Vesta extends Component {
  constructor(){
    super();

    this.state = {
      user_id: undefined,
      username: undefined,
      password: undefined,
      firstname: undefined,
      lastname: undefined,
      email: undefined,
      home_id: undefined,
      authenticated: false,
      modalShow: false,
      modalFunc: undefined
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleSignInShow = this.handleSignInShow.bind(this);
  }

  componentDidMount(){
      this.authentication();
  }

  authentication = () => {
      API.isSignedIn().then(res => {
        console.log(res);
          //If res.email is true then render this menu
          if(res.data.id){
              this.setState({
                authenticated: true,
                firstname: res.data.first_name,
                lastname: res.data.last_name,
                home_id: res.data.home_id,
                user_id: res.data.id,
                email: res.data.email
              });
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
    }).then(res => {
        this.setState({
          authenticated: true,
          firstname: res.data.first_name,
          lastname: res.data.last_name,
          home_id: res.data.home_id,
          user_id: res.data.id,
          password: undefined
        });
        if(res.data.home_id === null){
          this.authentication();
          this.handleClose()
          this.props.history.push("/Homeless")
        }else{
        this.authentication();
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
      }).then( res => {
        this.setState({
          firstname: res.data.first_name,
          lastname: res.data.last_name,
          home_id: null,
          user_id: res.data.id,
          password: undefined
        });
        this.authentication();
        this.handleClose()
        this.props.history.push("/Homeless")
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
    this.setState({modalFunc: "SignIn"})
    this.setState({modalShow: true})
  }

  handleSignUpShow = () =>{
    this.setState({modalFunc: "SignUp"})
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
            user_id={this.state.user_id} 
            username={this.state.username} 
            firstname= {this.state.firstname} 
            lastname= {this.state.lastname} 
            email= {this.state.email} 
            home_id= {this.state.home_id} 
            clickModalSignIn = {this.handleSignInShow}
            clickModalSignUp = {this.handleSignUpShow}
            clickSignout = {this.handleSignOutSubmit}
          />
        </ScrollspyNav>

        {/* Page Content Routes */}
        <div id="page-top">
        <Switch>
          <Route path="/" exact render={Home}/>
          <Route path="/Homeless" exact render={props => (<Homeless {...props} state={this.state} authenticated={this.state.authenticated} authenticate={this.authentication}/>)} />
          <Route path="/Homehub" exact render={props => (<Homehub {...props} state={this.state} authenticated={this.state.authenticated} authenticate={this.authentication}/>)}/>
          <Route component={NoMatch}/>
        </Switch>
        </div>
        <Footer />

        {/* SignIn Component */}
        <Modal show={this.state.modalShow} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              { this.state.modalFunc === "SignIn" ?
                <div>Sign In</div>:
                  this.state.modalFunc === "SignUp" ? <div>Sign Up</div>: null
              }</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            { this.state.modalFunc === "SignIn" ?
              <SignIn
              // Passing through functions
              handleFormSubmit={this.handleSignInSubmit}
              handleInputChange={this.handleInputChange}
              />
              :this.state.modalFunc === "SignUp" ?
                <SignUp
                // Passing through functions
                handleSignUpSubmit={this.handleSignUpSubmit}
                handleInputChange={this.handleInputChange}
                />
                : null
            }
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default Vesta;
