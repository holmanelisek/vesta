//--own recipe database?

//var pantry = require("pantry.js");

var pantry = "";

//var currentHave = pantry.findAll({
//    home_id: 1 //their home_id
//});

//var appID = "996e3c2c";
//var apiKey = "09f281b44cbf4d7b7fcfcae22f05c79d";

//var randompantry = randomly generate a number between 0 and the length of currentHave -1
//api search by currentHave[random].item_name

//var queryURL = "https://api.edamam.com/search?q=" + randompantry + "&app_id=" + appID + "&app_key=" + apiKey + "&from=0&to=10"

//var bestpercentage = 0;
//var bestrecipe= "";

//make recipe element function?

//function cleanIngrediant(ingr){
//    if(ingr[1]=="cups"||"cup"||"tablespoons"||"tablespoon"||"teaspoons"||"teaspoon"){
//        var slice = ingr.slice(2);
//        return slice.join( )
//    }else if(ingr[2]=="of"||"for"){

//    }
//}

//$.ajax({
//    url: queryURL,
//    method: "GET"
//}).then(function (response) {
//    //for each recipe
//    for(i=0;i<response.hits.length;i++){
//        var needlist= [];
//        var hascounter = []; 
        //for each ingredient
//        for(x=0;x<response.hits[i].ingredientList.length;x++){
//            var ingredient = response.hits[i].ingredientList[x];
//            var ingr = ingredient.split(" ");
//            var howmuch = ingr[0];
//            var ingrName = cleanIngrediant(ingr);
//        }
//    }
//})

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