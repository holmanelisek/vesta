import React from "react";

function DeletePet(props){
    return (
        <button className="deleteThisPet btn" onClick = {props.clickFunc}>{props.children}</button>
    )
}

export default DeletePet;