import React, { Component } from "react";
import { Route, Link, Switch } from 'react-router-dom'
import ScrollspyNav from "react-scrollspy-nav";
import Navbar from "../components/Navbar";
import SignIn from "../components/SignIn";
import SignUp from "../components/Signup";
import Home from "./subpages/Home";
import Homeless from "./subpages/Homeless";
import Homehub from "./subpages/Homehub";
import Account from "./subpages/Account";
import NoMatch from "./subpages/NoMatch";
import Footer from "../components/Footer";
import { Modal } from 'react-bootstrap';
import API from "../utils/API";

class Vesta extends Component {
  constructor() {
    super();

    this.state = {
      user_id: undefined,
      username: undefined,
      password: undefined,
      firstname: undefined,
      lastname: undefined,
      email: undefined,
      home_id: undefined,
      home_name: undefined,
      home_key: undefined,
      home_admin: undefined,
      home_street: undefined,
      home_city: undefined,
      home_state: undefined,
      home_zip: undefined,
      home_members: undefined,
      authenticated: false,
      modalShow: false,
      modalFunc: undefined,
      errResponse: false
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleSignInShow = this.handleSignInShow.bind(this);
  }

  componentDidMount() {
    this.authentication();
  }

  authentication = () => {
      API.isSignedIn().then(res => {
          console.log("Authentication")
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
              console.log("[Vesta.js getHomeInfomration]")
              this.getHomeInformation(res.data.home_id)
              this.getHomeMembers(res.data.home_id)
          }
      }).catch();
  }

  getHomeMembers = homeKey => {
    console.log("finding members")
    API.getAllHomeUsers({home_id: homeKey})
      .then(response => {
        console.log(response)
        this.setState({ home_members: response.data})
      }).catch(err => {
        console.log(err)
      })
  }

  getHomeInformation = homeKey => {
    console.log("finding home")
    API.findHomeById(homeKey)
      .then(response => {
        console.log(response)
        this.setState({
          home_key: response.data.invitation_key,
          home_admin: response.data.home_admin,
          home_name: response.data.home_name,
          home_street: response.data.street,
          home_city: response.data.city,
          home_state: response.data.state,
          home_zip: response.data.zip
        })
      }).catch()
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
      if (res.data.home_id === null) {
        this.authentication();
        this.handleClose()
        this.props.history.push("/Homeless")
      } else {
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
    }).then(res => {
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
    }).catch(err => {

      // console.log(err)
      //Do something with error
      if (err.response) {
        this.errorTimeout()
        // this.setState({ errResponse: true })
        console.log(this.state.errResponse);
      }
    });
  }

  handleSignOutSubmit = () => {
    API.signOut()
      .then(res => {
        this.setState({ authenticated: false });
        this.props.history.push("/")
      })
  }


  handleClose = () => {
    this.setState({ modalShow: false })
  }

  handleSignInShow = () => {
    this.setState({ modalFunc: "SignIn" })
    this.setState({ modalShow: true })
  }

  handleSignUpShow = () => {
    this.setState({ modalFunc: "SignUp" })
    this.setState({ modalShow: true })
  }

  errorTimeout = () => {
    this.setState({ errResponse: true });
    setTimeout(
      function () {
        this.setState({ errResponse: false });
      }
        .bind(this),
      5000
    );
  }

  render() {
    return (
      <div>
        {/* Navbar Component */}
        <Navbar
          authenticated={this.state.authenticated}
          user_id={this.state.user_id}
          username={this.state.username}
          firstname={this.state.firstname}
          lastname={this.state.lastname}
          email={this.state.email}
          home_id={this.state.home_id}
          clickModalSignIn={this.handleSignInShow}
          clickModalSignUp={this.handleSignUpShow}
          clickSignout={this.handleSignOutSubmit}
        />

        {/* Page Content Routes */}
        <div id="page-top">

        <Switch>
          <Route path="/" exact render={Home}/>
          <Route path="/Homeless" exact render={props => (<Homeless {...props} state={this.state} authenticated={this.state.authenticated} authenticate={this.authentication}/>)} />
          <Route path="/Account" exact render={ props => (
              <Account 
                {...props} 
                state={this.state} 
                authenticated={this.state.authenticated} 
                authenticate={this.authentication}
                getHomeMembers = {this.getHomeMembers}
              />
          )}/>
          <Route path="/Homehub" exact render={props => (<Homehub {...props} state={this.state} authenticated={this.state.authenticated} authenticate={this.authentication}/>)}/>
          <Route component={NoMatch}/>
        </Switch>
        </div>
        <Footer />

        {/* SignIn Component */}
        <Modal show={this.state.modalShow} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {this.state.modalFunc === "SignIn" ?
                <div>Sign In</div> :
                this.state.modalFunc === "SignUp" ? <div>Sign Up</div> : null
              }</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.modalFunc === "SignIn" ?
              <SignIn
                // Passing through functions
                handleFormSubmit={this.handleSignInSubmit}
                handleInputChange={this.handleInputChange}
              />
              : this.state.modalFunc === "SignUp" ?
                <SignUp
                  // Passing through functions
                  handleSignUpSubmit={this.handleSignUpSubmit}
                  handleInputChange={this.handleInputChange}
                  errResponse={this.state.errResponse}
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
