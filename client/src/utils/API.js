import axios from "axios";
import { it } from "date-fns/locale";

export default {
  // PASSPORT CALLS
  //Gets user_data only returns data if signed in
  isSignedIn: () => {
    return axios.get("/api/user_data");
  },
  // Post route to sign in
  signIn: signInData => {
    return axios.post("/api/login", signInData);
  },
  //Post route to sign up
  signUp: signUpData => {
    console.log(signUpData);
    return axios.post("/api/signup", signUpData);
  },
  signOut: () => {
    return axios.get("/api/logout");
  },
  //----------------------//


  //-----USER CALLS-----//
  // Returns all other users in the current user's home
  getAllHomeUsers: home_id => {
    return axios.post("/api/get/users", home_id);
  },

  // Join house call
  joinHome: joinData => {
    return axios.post("/api/users/join_home", joinData);
  },

  //Update account information
  updateUserInfo: userData => {
    return axios.post("/api/users/account_update", userData)
  },

  //Update account password
  updateAccountPass: newPass => {
    return axios.post("/api/users/password_update", newPass)
  },

  removeMember: data => {
    console.log(data)
    return axios.post("/api/users/remove_from_home", data)
  },
  //----------------------//


  //-----Home Calls-----//
  //Find home by invitation key aka home key
  findHomeByInvKey: id => {
    return axios.get("/api/home/find_by_key/" + id)
  },

  updateHomeAddress: homeData => {
    console.log(homeData)
    return axios.post("/api/home/update_address", homeData);
  },

  //find home by home id
  findHomeById: id => {
    return axios.get("/api/home/find_by_id/" + id)
  },

  //Create a new home
  createNewHome: homeData => {
    console.log(homeData);
    return axios.post("/api/home/create", homeData)
  },

  //find home master key
  findHomeMasterKey: reqData => {
    return axios.post("/api/home/master_key/retrieve", reqData)
  },
  //----------------------//


  //-----CHORE CALLS----//
  // Returns all chores for the user's home id
  getAllChores: home_id => {
    return axios.post("/api/get/chores", home_id);
  },

  // Adds new chore to user's home
  addChore: choreData => {
    console.log(choreData)
    return axios.post("/api/add/chores", choreData);
  },

  // Deletes specified chore
  deleteChore: choreData => {
    console.log(choreData)
    return axios.post("/api/delete/chores", choreData);
  },
  // Used for marking a chore complete
  markChoreComplete: choreData => {
    return axios.post("/api/edit/complete-chore", choreData);
  },
  // Used for marking a chore uncomplete
  markChoreUncomplete: choreData => {
    return axios.post("/api/edit/uncomplete-chore", choreData);
  },
  //----------------------//


  //-----PET CALLS-----//
  // Returns all pets associated with the user's home id
  getAllPets: home_id => {
    return axios.post("/api/get/pets", home_id);
  },
  // Adds new pet to user's home
  addPet: petData => {
    console.log(petData)
    return axios.post("/api/add/pet", petData);
    // home_id: req.body.home_id,
    // pet_name: req.body.pet_name,
    // age: req.body.age,
    // animal_type: req.body.animal_type,
    // primary_vet_id: req.body.primary_vet_id,
    // emergency_vet_id: req.body.emergency_vet_id
  },
  // Removes a pet 
  removePet: petId => {
    console.log(petId)
    return axios.post("/api/remove/pet/" + petId)
  },
  //----------------------//


  //-----VET CALLS-------//
  //Search all vets in array and return results
  getVetsByMultId: vetsArray => {
    console.log(vetsArray);
    return axios.post("/api/get/vets", vetsArray)
  },

  getAllVets: () => {
    return axios.get("/api/get/all_vets")
  },

  //Add new vet to database
  addNewVet: vetData => {
    console.log(vetData);
    return axios.post("/api/add/vet", vetData);
    // practice_name: req.body.practice_name,
    // phone_number: req.body.phone_number,
    // street: req.body.street,
    // city: req.body.city,
    // state: req.body.state,
    // zip: req.body.zip,
    // email: req.body.email,
    // emergency_clinic: req.body.emergency_clinic
  },
  //----------------------//


  //-----PANTRY CALLS-----//
  // Returns all items in pantry table associated with user's home id
  getPantryItems: home_id => {
    return axios.post("/api/get/pantry", home_id);
  },
  // Adds new item to user home's pantry
  addPantryItem: itemData => {
    return axios.post("/api/add/pantry", itemData);
  },
  // Adds 1 to chosen item's quantity
  addOrRemoveOneFromItem: itemData => {
    console.log(itemData)
    return axios.post("/api/update/quantity", itemData);
  },
  // Deletes item from pantry
  deletePantryItem: itemData => {
    return axios.post("/api/delete/pantry", itemData);
  },
  //----------------------//

  //Recipe API Call//
  getRecipe: queryURL => {
    return axios ({
      url: queryURL,
      method: "get"
    })
  }
  //-----------------//
};


