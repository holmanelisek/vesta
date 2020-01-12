import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark" id="homeNavBar">
        <div className="container">
            <a className="navbar-brand float" href="#page-top"><i className="fab fa-vuejs fa-3x"></i></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
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
            </div>
        </div>
    </nav>
  );
}

export default Navbar;
