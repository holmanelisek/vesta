import React, { Component } from "react";

class Chores extends Component {

    state = {
        userid: "",
        homeid: "",
        chores: []
    };

    componentDidMount (){
        //Function to get user House id
        //Function to get chores by house id
    }

    displayChores = chores => {

    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value.trim() });
      };

    render (){
        return (
            <div>
                
            </div>
        );
    }
}

export default Chores