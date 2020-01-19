import React, { Component } from "react";
import { Link, withRouter, Switch, Route } from "react-router-dom";
import HomeHubNav from "./nav-comp/homehubnav";
import HomeNav from "./nav-comp/homenav";
import API from "../../utils/API";
import "./style.css";

function Navbar (props){
        return (
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top nav-color" id="homeNavBar">
                <div className="container">
                    <a className="navbar-brand float" href="#page-top"><img src="../assets/images/vesta-logo-white.png" id="nav-icon"/></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            {props.authenticated ?
                                    props.history.location.pathname === "/" ? 
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
                                                {<Link to="/Homehub" className="nav-link">Home Hub</Link>}
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#" onClick={props.clickSignout} >Sign Out</a>
                                            </li>
                                        </ul>
                                    :props.history.location.pathname === "/Homehub" ?
                                            <ul className="navbar-nav text-uppercase ml-auto">
                                                <li className="nav-item">
                                                    {<Link to="/" className="nav-link">Home</Link>}
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" href="#" onClick={props.clickSignout} >Sign Out</a>
                                                </li> 
                                            </ul>
                                    :null
                            : 
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
                                        <a className="nav-link" href="" onClick={props.clickModalSignIn}>Sign In</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#" onClick={props.clickModalSignUp}>Sign Up</a>
                                    </li>
                                </ul>
                            }
                    </div>
                </div>
            </nav>
        );
    }

export default withRouter(Navbar);
