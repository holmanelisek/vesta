import React from "react";

class Pantry extends React.Component{
    constructor(){
        super();
    }
    render(){
        return(<div><h4>{this.props.item.item_name}</h4> <button type="button" className="btn btn-success" style={{margin:5}}>Purchased!</button></div>)
    }
}

export default Pantry;