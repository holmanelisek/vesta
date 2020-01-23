import React from "react";


//function to submit pet to server
export function SubmitPet(props){
    return (
        <button className="addThisPet btn" onClick = {props.clickFunc}>{props.children}</button>
    )
}

//function to open the add pet modal
export function AddPetModal(props){
    return (
        <button className="addThisPet btn" onClick = {props.clickFunc}>{props.children}</button>
    )
}