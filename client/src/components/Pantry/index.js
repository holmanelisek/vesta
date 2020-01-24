import React from "react";

export class Pantry extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (<div><h4>{this.props.item.item_name}</h4> <button type="button" className="btn btn-success" style={{ margin: 5 }}>Purchased!</button></div>)
    }
}

export class Recipe extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div class="col-12">
                <p>Suggested for you: {this.props.recipe.recipe}</p>
                <p><a href={this.props.recipe.url}></a></p>
                <p>You have {this.props.recipe.percent}% of the items you need!</p>
            </div>)
    }
}
