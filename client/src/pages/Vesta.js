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
import API from "../utils/API";

class Vesta extends Component {
  state = {
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    email: "",
    authenticated: false
  };

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
          window.location.reload(false);
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
        window.location.reload(false);
      }).catch( err => {
        //Do something with error
    });
  }

  render() {
    return (
      <div>

        {/* Navbar Component */}
        <ScrollspyNav
            scrollTargetIds={["about", "services", "team"]}
            offset={-56}
            activeNavClass="is-active"
            scrollDuration="400"
            headerBackground="true"
            router='Route'
        >
          <Navbar authenticated={this.state.authenticated}/>
        </ScrollspyNav>

        {/* Page Content Routes */}
        <div id="page-top">
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/Home" exact component={Home}/>
          <Route path="/Homehub" exact render={props => (<Homehub {...props} authenticated={this.state.authenticated}/>)}/>
          <Route component={NoMatch}/>
        </Switch>
        </div>
        <Footer />
        {/* SignIn Component */}
        <SignIn
          // Passing through functions
          handleFormSubmit={this.handleSignInSubmit}
          handleInputChange={this.handleInputChange}
        />
        {/* SignUp Component */}
        <SignUp
          // Passing through functions
          handleSignUpSubmit={this.handleSignUpSubmit}
          handleInputChange={this.handleInputChange}
        />
      </div>
    );
  }
}

export default Vesta;
