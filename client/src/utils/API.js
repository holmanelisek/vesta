import axios from "axios";

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
//----------------------//


//-----Home Calls-----//
  //Find home by invitation key aka home key
  findHomeByInvKey: id => {
    return axios.get("/api/home/find_by_key/" + id)
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
//----------------------//


//-----CHORE CALLS----//
  // Returns all chores for the user's home id
  getAllChores: home_id => {
    return axios.post("/api/get/chores", home_id);
  },

  // Adds new chore to user's home
  addChore: choreData => {
    console.log(choreData);
    return axios.post("/api/add/chores", choreData);
  },
  // Used for marking a chore complete
  markChoreComplete: choreData => {
    return axios.post("/api/edit/complete-chore", choreData);
  },
//----------------------//


//-----PET CALLS-----//
  // Returns all pets associated with the user's home id
  getAllPets: home_id => {
    return axios.post("/api/get/pets", home_id);
  },
  // Adds new pet to user's home
  addPet: petData => {
    return axios.post("/api/add/pet", petData);
  },
  // Removes a pet 
  removePet: petId => {
    console.log(petId)
    return axios.post("/api/remove/pet/" + petId)
  },
//----------------------//


//-----VET CALLS-------//
  getVetsByMultId: vetsArray => {
    console.log(vetsArray);
    return axios.post("/api/get/vets", vetsArray)
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
  }
//----------------------//
};
