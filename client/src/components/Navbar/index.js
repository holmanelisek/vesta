import React from "react";
import { Link, withRouter} from "react-router-dom";

function Navbar (props){
        return (
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top nav-color" id="homeNavBar">
                <div className="container">
                    <a className="navbar-brand float" href="#page-top"><img src="../assets/images/vesta-logo-white.png" id="nav-icon"/></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            {/* Checks for user authentication */}
                            {props.authenticated ?
                                    // If authentication then give this menu
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
                                                {/* Gives Home hub link if user belongs to a home, Home Setting link if user is homeless */}
                                                {props.home_id !== null ?
                                                    <Link to="/Homehub" className="nav-link">Home Hub</Link>
                                                :
                                                    <Link to="/Homeless" className="nav-link">Home Setting</Link>
                                                }
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#" onClick={props.clickSignout} >Sign Out</a>
                                            </li>
                                        </ul>
                                    // Checks the path and displays links accordingly
                                    :props.history.location.pathname === "/Homehub" ?
                                            <ul className="navbar-nav text-uppercase ml-auto">
                                                <li className="nav-item">
                                                    {<Link to="/" className="nav-link">Home</Link>}
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" href="#" onClick={props.clickSignout} >Sign Out</a>
                                                </li> 
                                            </ul>
                                    :props.history.location.pathname === "/Homeless" ?
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
                                // If unauthorized give this menu
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
