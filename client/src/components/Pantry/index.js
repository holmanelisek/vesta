import React from "react";



  // convertToDays = milliseconds => {
  //   var seconds = (milliseconds / 1000);
  //   var minutes = seconds / 60;
  //   var hours = minutes / 60;
  //   var days = hours / 24;
  //   return days
  // }

  // needItems = pantry => {
  //   var need = []
  //   for (var i = 0; i++; i < pantry.length) {
  //     if (pantry[i].date_out > 0) {
  //       var timeLeft = pantry[i].date_out - Date.now();
  //       var dayOut = convertToDays(timeLeft);
  //       if (dayOut < 3) {
  //         need.append(pantry[i]);
  //       }
  //     } else if (pantry[i].quantity <= pantry[i].low_quantity) {
  //       need.append(pantry[i]);
  //     }
  //   }
  //   return need;
  // }


  // needPantry = homeID => {
  //   API.getPantryItems({
  //     home_id: homeID
  //   })
  //     .then(res => {
  //       var needed = needItems(res);
  //       this.setState({ itemsneeded: needed })
  //     })
  // }


  // recipeInfo = homeID => {
  //   API.getPantryItems({
  //     home_id: homeID
  //   })
  //     .then(res => {
  //       var chosen = recipeeval.pickRecipe(res)
  //       this.setState({ recipesuggested: chosen })
  //     })
  // }



export class HavePantry extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <li className="list-group-item list-group-item-success"><h4>{this.props.item.item_name}</h4> <button type="button" className="btn btn-success" style={{ margin: 5 }}>Purchased!</button></li>
            )
    }
}

export class NeedPantry extends React.Component {
    constructor(){
        super();
    }
    render(){
        return(
            <li className="list-group-item list-group-item-danger"><h4>{this.props.item.item_name}</h4> <button type="button" className="btn btn-success" style={{ margin: 5 }}>Purchased!</button></li>)
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
