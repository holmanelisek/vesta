import React from 'react';
import ReactDOM from 'react-dom';
import API from '../../utils/API'
var appID = "996e3c2c";
var apiKey = "09f281b44cbf4d7b7fcfcae22f05c79d";

export class Recipe extends React.Component {
    constructor() {
        super();
        this.state = {
            recipe: {},
        }
    };
    
    
    componentDidMount = () => {
        //var homeID = this.props.home_id;
        console.log("Here you are!" + this.props.home_id);
        //var choice = this.placeHolderFunction(this.props.home_id);
        //console.log(choice);
        //this.setState({recipe: choice});
        console.log("You made it to the placeholder!")
        var recipechoice = {};
        var that = this;
        API.getPantryItems({
            home_id: this.props.home_id
        }).then(function(res){
            var random = Math.floor(Math.random() * Math.floor(res.data.length));
            var randompantry = res.data[random].item_name;
            var queryURL = "https://api.edamam.com/search?q='" + randompantry + "'&app_id=" + appID + "&app_key=" + apiKey + "&from=0&to=10";
            console.log("You made it 2")
            API.getRecipe(queryURL).then(function(response){
                let recipes = response.data.hits;
                let randomnum = Math.floor(Math.random()* Math.floor(recipes.length));
                recipechoice = recipes[randomnum].recipe;
                that.setState({recipe:recipechoice});
                //return {recipe: chosen.label, url: chosen.url, image: chosen.image};
            })
            console.log("This is: "+this);
        })
        console.log("This is: "+this);
    };


    placeHolderFunction = homeID => {
        console.log("You made it to the placeholder!")
        API.getPantryItems({
            home_id: homeID
        }).then(function(res){
            var pantry = res.data;
            var random = Math.floor(Math.random() * Math.floor(pantry.length));
            var randompantry = pantry[random].item_name;
            var queryURL = "https://api.edamam.com/search?q='" + randompantry + "'&app_id=" + appID + "&app_key=" + apiKey + "&from=0&to=10";
            var recipechoice = {};
            console.log("You made it 2")
            API.getRecipe(queryURL).then(function(response){
                let recipes = response.data.hits;
                let randomnum = Math.floor(Math.random()* Math.floor(recipes.length));
                let chosen = recipes[randomnum].recipe;
                console.log("You made it 3");
                //return {recipe: chosen.label, url: chosen.url, image: chosen.image};
            })
        })
    }

    pickRecipe = homeID => {
        console.log("You made it!" + homeID);
        API.getPantryItems({
            home_id: homeID
        }).then(function(res){
            console.log("here!")
            var pantry = res.data;
            var bestrecipe = [];
        //pull all of the ingredients in the user's pantry
        //randomly select one of the pantry items
        var random = Math.floor(Math.random() * Math.floor(pantry.length))
        var randompantry = pantry[random].item_name;
        //search the api for 10 recipes using the random item as an ingredient
        var queryURL = "https://api.edamam.com/search?q='" + randompantry + "'&app_id=" + appID + "&app_key=" + apiKey + "&from=0&to=10";
        console.log(queryURL);
        API.getRecipe(queryURL).then(function (response) {
            console.log("Hello beautiful");
            var recipes = response.data.hits;
            console.log(recipes);
            {
                var bestpercent = 0;
                var bestrecipe = "";
                var bestneed = [];
                var besturl;
                var bestimage;
                 //for each recipe
                 for(const recipe of recipes){
                    var needlist = [];
                    var hascounter = 0;
                    var haspercent = 0;
                    for(const ingredient of recipe.recipe.ingredientLines){
                        var ingr = ingredient.split(" ");
                        console.log(ingredient);
                        var quantity = parseInt(ingr[0]);
                        if(Number.isInteger(quantity)){
                            var howmuch = ingr[0];
                            var ingrunit = "unit";
                            if(ingr[1]=="cups"||"cup"||"c"||"tablespoons"||"tablespoon"||"tbsp"||"tsp"||"teaspoons"||"teaspoon"){
                                ingrunit = ingr[1];
                            }
                            var ingrName = "";
                            //cleanIngrediant
                            var name = "";
                            //if unit is listed, adjust unit
                            if(ingr[1]=="cups"||"cup"||"c"||"tablespoons"||"tablespoon"||"tbsp"||"tsp"||"teaspoons"||"teaspoon"){
                                //return name of ingredient
                                if(ingr[2]=="of"){
                                    name = ingr.slice(3);
                                    return name.join(" ")
                                }else {
                                    name = ingr.slice(2);
                                    return name.join(" ")
                                }
                            } else if (ingr[1]=="of"){
                                name = ingr.slice(2);
                                return name.join(" ");
                            //garnishes not included
                            } else if (ingr[ingr.length-1]=="garnish"){
                                name = "ignore";
                                ingrName = name;
                            }
                            //
                            if(this.haveEnough(howmuch,ingrunit,ingrName)){
                                hascounter++;
                         }else{
                             needlist.append(ingrName);
                         }
                        }
                        
                    }
                    haspercent = hascounter / (recipe.recipe.ingredientList.length);
                    if(haspercent>bestpercent){
                        bestrecipe = recipe.recipe.label;
                        bestneed = needlist;
                        besturl = recipe.recipe.url;
                        bestimage = recipe.recipe.image;
                        bestpercent = haspercent;
                            }
                 }
                    //generate a percentage of the ingredients you have (have divided by needed)
                var recipechoice = {percent: bestpercent, recipe: bestrecipe, need: bestneed, url: besturl, image: bestimage}
                console.log(recipechoice)
                }
        })
        })
    
    }

    pickBest = recipes => {
        var bestpercent = 0;
        var bestrecipe = "";
        var bestneed = [];
        var besturl;
        var bestimage;
         //for each recipe
         for(const recipe of recipes){
            var needlist = [];
            var hascounter = 0;
            var haspercent = 0;
            for(const ingredient of recipe.recipe.ingredientList){
                var ingr = ingredient.split("");
                var howmuch = ingr[0];
                var ingrunit = "unit";
                if(ingr[1]=="cups"||"cup"||"c"||"tablespoons"||"tablespoon"||"tbsp"||"tsp"||"teaspoons"||"teaspoon"){
                    ingrunit = ingr[1];
                }
                var ingrName = this.cleanIngrediant(ingr);
                if(this.haveEnough(howmuch,ingrunit,ingrName)){
                    hascounter++;
             }else{
                 needlist.append(ingrName);
             }
            }
            haspercent = hascounter / (recipe.recipe.ingredientList.length);
            if(haspercent>bestpercent){
                bestrecipe = recipe.recipe.label;
                bestneed = needlist;
                besturl = recipe.recipe.url;
                bestimage = recipe.recipe.image;
                bestpercent = haspercent;
                    }
         }
            //generate a percentage of the ingredients you have (have divided by needed)
        var recipechoice = {percent: bestpercent, recipe: bestrecipe, need: bestneed, url: besturl, image: bestimage}
        console.log(recipechoice)
        return recipechoice;
        }

        
//evaluate if you have enough of the needed ingredient in your pantry
 haveEnough = (value,unit,name) => {
    var have = [];
    for(const ingredient of this.props.pantryItems){
        if(ingredient.item_name===name){
            have.append(ingredient);
        };
    }
    if(have.length===0){
        //nothing in the pantry by that name means you don't have enough!
        return false;
    }else{
        var enough = false;
        //how much is in pantry
        var haveValue;
        //how much you need based on recipe
        var wantValue = value;
        var wantUnit = unit;
        for(const choice of have){
            //convert need to pantry units
            wantValue = this.matchingUnits(choice.quantity_unit,wantValue,wantUnit);
            //adjust unit
            wantUnit = choice.quantity_unit;
            //how much is in pantry from this entry
            haveValue = choice.quantity;
            //subtract how much you have from how much the recipe requires
            wantValue = wantValue-haveValue;
            if(wantValue<=0){
                //if you need 0 or less, you have enough to make your recipe!
                enough = true;
            }
        }
    return enough;
    }
}




 matchingUnits = (haveUnits,needValue,needUnits) => {
    if(haveUnits=="cups"||"cup"||"c"){
        if(needUnits=="unit"||"units"||"cups"||"cup"||"c"){
            return needValue;
        }else if(needUnits=="tablespoons"||"tablespoon"||"tbsp"){
            //16 tablespoons in a cup
            return needValue*.0625;
        }else if(needUnits=="tsp"||"teaspoons"||"teaspoon"){
            //48 teaspoons in a cup
            return needValue*.0208;
        }
    }else if(haveUnits=="tablespoons"||"tbsp"||"tablespoon"){
        if(needUnits=="unit"||"units"||"cups"||"cup"||"c"){
            //16 tablespoons in a cup
            return needValue*16;
        }else if(needUnits=="tablespoons"||"tablespoon"||"tbsp"){
            return needValue;
        }else if(needUnits=="tsp"||"teaspoons"||"teaspoon"){
            //3 tsp in a tbsp
            return (needValue/3);
        }
    }else if(haveUnits=="tsp"||"teaspoons"||"teaspoon"){
        if(needUnits=="unit"||"units"||"cups"||"cup"||"c"){
            //48 tsp in a cup
            return needValue*48
        }else if(needUnits=="tablespoons"||"tbsp"||"tablespoon"){
            //3 tsp in a tbsp
            return needValue*3;
        }else if(needUnits=="tsp"||"teaspoons"||"teaspoon"){
            return needValue;
        }
    }
}


    render() {
        return (
            <div class="col-12">
                <p><a href={this.state.recipe.url}>Suggested for you: {this.state.recipe.label}</a></p>
                {/* <p>You have {this.state.recipe.percent}% of the items you need!</p> */}
            </div>)
    }
}



//pull pantry info by home_id
    //save item_name, quantity, quantityUnit
//randomly select one of the pantry items
//api search ingredient as pantry item
//save each recipe's label(name),image,url,ingredients,liked/disliked(bools), havepercentage
//for each ingredient
    //split by " "
    //if [1] is a unit of measurement, concat [2] and after (remove for/of)
    //else, concat [1] and after (remove for/of), save unit as unit
    //search pantry for ingredient
        //if has
            //compare units of measurement, convert
            //if has enough, add +1 to hascounter
            //else, add percentage to hascounter,add ingredient to needlist
        //else, add ingredient to needlist
//after all the ingredients, divide hascounter by number of ingredients, havepercentage
//if havepercentage is currently highest, prioritize this recipe