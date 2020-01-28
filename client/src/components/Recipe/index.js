import React from 'react';
import ReactDOM from 'react-dom';
import API from '../../utils/API'
var appID = "996e3c2c";
var apiKey = "09f281b44cbf4d7b7fcfcae22f05c79d";

export class Recipe extends React.Component {
    constructor() {
        super();
        this.state = {
            pantry: [],
            needlist: [],
            havepercent: 0,
            recipe: "",
            link: "",
        }
    };


    componentDidMount = () => {
        //var homeID = this.props.home_id;
        console.log("Here you are!" + this.props.home_id);
        this.pickRecipe(this.props.home_id);
    };




    pickRecipe = homeID => {
        var recipechoice = "Test option";
        var that = this;
        API.getPantryItems({
            home_id: homeID
        }).then(function (res) {
            var pantry = res.data;
            if (pantry.length > 0) {
                that.setState({ pantry: pantry });
                var random = Math.floor(Math.random() * Math.floor(pantry.length));
                var randompantry = pantry[random].item_name;
                var queryURL = "https://api.edamam.com/search?q='" + randompantry + "'&app_id=" + appID + "&app_key=" + apiKey + "&from=0&to=10";
                API.getRecipe(queryURL).then(function (response) {
                    console.log("URL: " + queryURL);
                    let recipes = response.data.hits;
                    console.log(recipes);
                    //PLACEHOLDERlet randomnum = Math.floor(Math.random()* Math.floor(recipes.length));
                    //PLACEHOLDERrecipechoice = recipes[randomnum].recipe;
                    //VARIABLES: BESTNEEDLIST,BESTHAVEPERCENT,BESTRECIPECHOICE
                    var bestneedlist = [];
                    var besthavepercent = 0;
                    var bestrecipechoice = "";
                    var besturl = "";
                    //FOR EACH RECIPE IN RECIPES
                    console.log("At zero: " + recipes[0].recipe.label);
                    console.log(recipes.length);
                    recipes.forEach(function (recipe) {
                        console.log(recipe.recipe.label);
                        //NEEDLIST, HAVECOUNTER
                        var needlist = [];
                        var havecounter = 0;
                        //CLEAN INGREDIENTS LIST, PUT INTO AN ARRAY
                        var ingredientarray = recipe.recipe.ingredients;
                        console.log(ingredientarray);
                        ingredientarray.forEach(function (ingr) {
                            var ingredient = ingr.text;
                            console.log(ingredient);
                            var have = false;
                            var pantry = that.state.pantry;
                            pantry.forEach(function (item) {
                                var ingr = ingredient.toLowerCase();
                                var name = item.item_name.toLowerCase();
                                if (ingr.includes(name)) {
                                    have = true;
                                    console.log("It's true! We've got it!");
                                }
                            })
                            if (have) {
                                havecounter++;
                                console.log("Have update:" + havecounter);
                            } else {
                                needlist.push(ingredient);
                                console.log("Need: " + needlist);
                            }
                        })
                        var havepercent = havecounter / ingredientarray.length;
                        console.log("Look at us doing math:" + havepercent);
                        console.log("Comparing" + besthavepercent);
                        if (havepercent > besthavepercent) {
                            console.log("Found a better choice!")
                            besthavepercent = Math.round(havepercent * 100);
                            bestneedlist = needlist;
                            bestrecipechoice = recipe.recipe.label;
                            besturl = recipe.recipe.url;
                        }
                        that.setState({ needlist: bestneedlist, havepercent: besthavepercent, recipe: bestrecipechoice, link: besturl });
                    })
                    //FOR EACH INGREDIENT, SEARCH PANTRY
                    //IF HAVE, HAVECOUNTER++
                    //ELSE, PUSH NAME TO NEEDLIST
                    //AFTER ALL INGREDIENTS HAVE BEEN EVALUATED, DIVIDE HAVECOUNTER BY NUMBER OF INGREDIENTS (=HAVEPERCENT)
                    //IF IS HIGHER THAN BESTHAVEPERCENT, BESTNEEDLIST = NEEDLIST, BESTHAVEPERCENT = HAVEPERCENT, BESTRECIPECHOICE = RECIPE


                    //THAT.SETSTATE WILL EQUAL BESTRECIPE CHOICE, NEEDLIST WILL EQUAL BESTNEEDLIST, HAVEPERCENT WILL EQUAL BESTHAVEPERCENT
                    //PLACEHOLDERthat.setState({recipe:recipechoice});
                })
            } else {
                console.log("Empty Pantry");
            }
        })

    }



    render() {
        return (
            <div class="col-12">
                <p>Suggested for you: <a href={this.state.link}>{this.state.recipe}</a></p>
                <p>You have {this.state.havepercent}% of the items you need!</p>
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