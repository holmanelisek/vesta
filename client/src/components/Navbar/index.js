import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import API from "../../utils/API";
import "./style.css";

class Navbar extends Component{
    state = {
        isSignedIn: false,
        data: []
    };

    handleSignOutSubmit = event => {
        event.preventDefault();
        API.signOut()
          .then( res => {
                //this.setState({isSignedIn: false, data: []});
                //this.props.history.push("/");
                window.location.reload();
            })
      }

    //Function for displaying menu links based on if user is logged in or not.
    isSignedIn = () => {
        console.log(this.props.authenticated)
        console.log(this.props);
        if(this.props.authenticated){
            return (
                <ul className="navbar-nav text-uppercase ml-auto">
                    <li className="nav-item">
                        {<Link to="/" className="nav-link" onClick={()=> this.props.history.push("/")}>Home</Link>}
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#about">About</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link " href="#services">Features</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#team">Team</a>
                    </li>
                    <li className="nav-item">
                        {<Link to="/Homehub" className="nav-link">Home Hub</Link>}
                    </li>
                    <li className="nav-item">
                        {/* Figure out how to sign users out */}
                        <a className="nav-link" href="#" onClick={this.handleSignOutSubmit} >Sign Out</a>
                    </li>
                </ul>
            )
        //If res.email is not true render this menu
        }else{
            return (
                <ul className="navbar-nav text-uppercase ml-auto">
                    <li className="nav-item">
                        {/* <a className="nav-link" href="#page-top">Home</a> */}
                        {<Link to="/" className="nav-link">Home</Link>}
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#about">About</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link " href="#services">Features</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#team">Team</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#" data-toggle="modal" data-target="#modalLoginForm">Sign In</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#" data-toggle="modal" data-target="#modalRegisterForm" >Sign Up</a>
                    </li>
                </ul>
            )
        }
    }
    
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark" id="homeNavBar">
                <div className="container">
                    <a className="navbar-brand float" href="#page-top"><img src="../assets/images/vesta-logo-icon-white.png" id="header-icon"/></a>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        {this.isSignedIn()};
                    </div>
                </div>
            </nav>
        );
    }
}

export default withRouter(Navbar);
