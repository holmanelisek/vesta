import React from "react"
import { Link } from "react-router-dom";
import "../style.css";

function homehubnav (props){
    return (
        <ul className=" navbar-nav text-uppercase ml-auto">
            <li className="nav-item">
                {<Link to="/" className="nav-link" onClick={()=> props.onClickHome }>Home</Link>}
            </li>
        </ul>
    )
}

export default homehubnav;