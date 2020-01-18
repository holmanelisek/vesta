import React from "react"
import { Link } from "react-router-dom";
import "../style.css";

function homenav (props){
    return (
        <ul className="navbar-nav text-uppercase ml-auto">
            <li className="nav-item">
                {<Link to="/" className="nav-link" onClick={()=> props.onClickHome }>Home</Link>}
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
        </ul>
    )
}

export default homenav;