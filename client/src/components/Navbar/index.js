import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import "./style.css";

class Navbar extends Component{
    state = {
        isSignedIn: true
    };

    componentDidMount(){
    //This API call is disabled until we can run the server
        // API.isSignedIn().then(res => {
        //     //If res.email is true then render this menu
        //     if(res.email){
        //         return (
        //             <ul className="navbar-nav text-uppercase ml-auto">
        //                 <li className="nav-item">
        //                     <a className="nav-link" href="#page-top">Home</a>
        //                 </li>
        //                 <li className="nav-item">
        //                     <a className="nav-link" href="#about">About</a>
        //                 </li>
        //                 <li className="nav-item">
        //                     <a className="nav-link " href="#services">Features</a>
        //                 </li>
        //                 <li className="nav-item">
        //                     <a className="nav-link" href="#team">Team</a>
        //                 </li>
        //                 <li className="nav-item">
        //                     {/* Input href for the homehub page */}
        //                     <a className="nav-link" href="#" data-toggle="modal" data-target="#modalLoginForm">Home Hub</a>
        //                 </li>
        //                 <li className="nav-item">
        //                     {/* Figure out how to sign users out */}
        //                     <a className="nav-link" href="#" data-toggle="modal" data-target="#modalRegisterForm" >Sign Out</a>
        //                 </li>
        //             </ul>
        //         )
        //     //If res.email is not true render this menu
        //     }else{
        //         return (
        //             <ul className="navbar-nav text-uppercase ml-auto">
        //                 <li className="nav-item">
        //                     <a className="nav-link" href="#page-top">Home</a>
        //                 </li>
        //                 <li className="nav-item">
        //                     <a className="nav-link" href="#about">About</a>
        //                 </li>
        //                 <li className="nav-item">
        //                     <a className="nav-link " href="#services">Features</a>
        //                 </li>
        //                 <li className="nav-item">
        //                     <a className="nav-link" href="#team">Team</a>
        //                 </li>
        //                 <li className="nav-item">
        //                     <a className="nav-link" href="#" data-toggle="modal" data-target="#modalLoginForm">Sign In</a>
        //                 </li>
        //                 <li className="nav-item">
        //                     <a className="nav-link" href="#" data-toggle="modal" data-target="#modalRegisterForm" >Sign Up</a>
        //                 </li>
        //             </ul>
        //         )
        //     }
        // }).catch();

    //Use this IF statement to test our the menu
        if(this.state.isSignedIn){
            return (
                <ul className="navbar-nav text-uppercase ml-auto">
                    <li className="nav-item">
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
                        {/* Input href for the homehub page */}
                        {/* <a className="nav-link" href={<Link to={"/"}></Link>} data-toggle="modal">Home Hub</a> */}
                        {<Link to="/admin" className="nav-link">Home Hub</Link>}
                    </li>
                    <li className="nav-item">
                        {/* Figure out how to sign users out */}
                        <a className="nav-link" href="#" data-toggle="modal" data-target="#modalRegisterForm" >Sign Out</a>
                    </li>
                </ul>
            )
        //If res.email is not true render this menu
        }else{
            return (
                <ul className="navbar-nav text-uppercase ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="#page-top">Home</a>
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
                    <a className="navbar-brand float" href="#page-top"><i className="fab fa-vuejs fa-3x"></i></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        {this.componentDidMount()};
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;
