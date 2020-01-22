import React, { Component } from "react";
import Modal from "react-bootstrap";

class AddPet extends Component{
    constructor(){
        super();

        this.state = {
            modalShow: false,
            modalFunc: undefined,
            home_id: undefined,
            masterKey: undefined,
            homeName: undefined,
            homeStreet: undefined,
            homeUnit: undefined,
            homeCity: undefined,
            homeState: undefined,
            homeZip: undefined,
        };
    }

    render(){
        return(
            <div>

            </div>
        )
    }
}

export default AddPet;