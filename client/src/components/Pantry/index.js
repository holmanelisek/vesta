var recipeeval = require("../../../public/assets/javascript/recipes")
import API from "../../utils/API"
import React, {Component} from "react";

class Pantry extends Component{
    constructor(){
        super();

        this.state = {
            pantryitems: [],
            itemsneeded: [],
            recipesuggested: []
        }
    }

    //state: home_id, array of pantry items, items needed?, recipe suggestion

    listPantry = homeID => {
        API.getPantryItems({
            home_id: homeID
        })
            .then(res => {
                let pantry = res.data;
                this.setState({pantryitems: pantry});
            })
    }

    //Items in Pantry list
        //grab items by home id, display:
            //item name (quantity quantityunit)
            //best_by or date out


    //needItems = pantry => {
    //    var need = []
    //    for(i=0;i++;i<pantry.length){
    //        if(){

    //        }
    //    }
    //}
    

    //needPantry = homeID => {
     //   API.getPantryItems({
      //      home_id: homeID
        //})
          //  .then(res =>{          
                //for each item, evaluate date
                //add to array of needed
                //set state
    //        })
    //}
    //Items needed list (go out within the next three days or been in there a week?)
        //go through all pantry items, if date out/best_by is within 3 days, display (sort by proximity?)
        //if no date out/best_by date, if date in was over a week ago
        //Display:
            //item name (quantity quantityunit)
            //best_by or date out? or date in

    //Recipe info here
    
}

export default Pantry;