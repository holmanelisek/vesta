import axios from "axios";

export default {
  //Gets user_data only returns data if signed in
  isSignedIn: function() {
    return axios.get("/api/user_data");
  },
  // Post route to sign in
  signIn: function(signInData) {
    console.log(signInData);
    return axios.post("/api/login", signInData);
  },
  //Post route to sign up
  signUp: function(signUpData) {
    console.log(signUpData);
    return axios.post("/api/signup", signUpData);
  },
  testApi: function(){
    return axios.get("https://dog.ceo/api/breeds/image/random");
  }
};
