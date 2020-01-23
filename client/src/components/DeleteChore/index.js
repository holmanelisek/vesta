import React from "react";

function DeleteChore(props) {
    return (
        <button className="deleteThisChore btn" onClick={props.clickFunc}>{props.children}</button>
    )
}

export default DeleteChore;