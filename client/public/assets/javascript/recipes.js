import API from "../../utils/API";
var appID = "996e3c2c";
var apiKey = "09f281b44cbf4d7b7fcfcae22f05c79d";
var currentHave = [];

function pickRecipe(pantry){
    var recipe = [];
    //pull all of the ingredients in the user's pantry
    //randomly select one of the pantry items
    var randompantry = pantry[Math.floor(Math.random() * Math.floor(currentHave.length))].item_name;
    //search the api for 10 recipes using the random item as an ingredient
    var queryURL = "https://api.edamam.com/search?q=" + randompantry + "&app_id=" + appID + "&app_key=" + apiKey + "&from=0&to=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
       recipe = pickBest(response);
    })
    return recipe
}

function pickBest(recipes){
    var bestpercent = 0;
    var bestrecipe = "";
    var bestneed = [];
    var besturl;
    var bestimage;
     //for each recipe
     for(i=0;i<recipes.hits.length;i++){
        var needlist= [];
        var hascounter = 0; 
        var haspercent;
      //for each ingredient
        for(x=0;x<recipes.hits[i].recipe.ingredientList.length;x++){
            var ingredient = recipes.hits[i].recipe.ingredientList[x];
            var ingr = ingredient.split(" ");
            var howmuch = ingr[0];
            var ingrunit = "unit";
            var ingrName = cleanIngrediant(ingr);
            //function to compare ingredient to current have. if returns true, have enough. +1 to hascounter. else, add name to needlist
            if(haveEnough(howmuch,ingrunit,ingrName)){
                   hascounter++;
            }else{
                needlist.push(ingrName);
            }
            }
        //generate a percentage of the ingredients you have (have divided by needed)
            haspercent = hascounter / (recipes.hits[i].ingredientList.length);
            if(haspercent>bestpercent){
                bestrecipe = recipes.hits[i].recipe.label;
                bestneed = needlist;
                besturl = recipes.hits[i].recipe.url;
                bestimage = recipes.hits[i].recipe.image;
                bestpercent = haspercent;
            }
        }
    var recipe = {percent: bestpercent, recipe: bestrecipe, need: bestneed, url: besturl, image: bestimage}
    return recipe;
    }



//evaluate if you have enough of the needed ingredient in your pantry
function haveEnough(value,unit,name){
    var have = [];
    for(i=0;i++;i<currentHave.length){
        if(currentHave[i].item_name===name){
            have.append(currentHave[i]);
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
        for(i=0;i++;i<have.length){
            //convert need to pantry units
            wantValue = matchingUnits(have[i].quantity_unit,wantValue,wantUnit);
            //adjust unit
            wantUnit = have[i].quantity_unit;
            //how much is in pantry from this entry
            haveValue = have[i].quantity;
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

function matchingUnits(haveUnits,needValue,needUnits){
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

function cleanIngrediant(ingr){
    var name = "";
    //if unit is listed, adjust unit
    if(ingr[1]=="cups"||"cup"||"c"||"tablespoons"||"tablespoon"||"tbsp"||"tsp"||"teaspoons"||"teaspoon"){
        ingrunit = ingr[1];
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
        return name;
    }
    }

    module.exports = pickRecipe(pantry);


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