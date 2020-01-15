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

  // USER CALLS
  // Returns all other users in the current user's home
  grabAllHomeUsers: home_id => {
    return axios.post("/api/get/users", home_id);
  },

  // CHORE CALLS
  // Returns all chores for the user's home id
  getAllChores: home_id => {
    return axios.post("/api/get/chores", home_id);
  },
  // Adds new chore to user's home
  addChore: choreData => {
    return axios.post("/api/add/chores", choreData);
  },

  // PET CALLS
  // Returns all pets associated with the user's home id
  getAllPets: home_id => {
    return axios.post("/api/get/pets", home_id);
  },
  // Adds new pet to user's home
  addPet: petData => {
    return axios.post("/api/add/pets", petData);
  },

  // PANTRY CALLS
  // Returns all items in pantry table associated with user's home id
  getPantryItems: home_id => {
    return axios.post("/api/get/pantry", home_id);
  },
  // Adds new item to user home's pantry
  addPantryItem: itemData => {
    return axios.post("/api/add/pantry", itemData);
  }
};
