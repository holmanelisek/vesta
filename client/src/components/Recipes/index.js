import React from "react";
class Recipe extends React.Component{
    constructor(){
        super();
    }
    render(){
        return(
        <div class="col-12">
        <p>Suggested for you: {this.props.recipe.recipe}</p>
        <p><a href = {this.props.recipe.url}></a></p>
        <p>You have {this.props.recipe.percent}% of the items you need!</p>
        </div>)
    }
}

export default Recipe;