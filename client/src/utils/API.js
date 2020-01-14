import axios from "axios";

export default {
  //Gets user_data only returns data if signed in
  isSignedIn: () => {
    return axios.get("/api/api/user_data");
  },
  // Post route to sign in
  signIn: signInData => {
    return axios.post("/api/api/login", signInData);
  },
  //Post route to sign up
  signUp: signUpData => {
    console.log(signUpData);
    return axios.post("/api/api/signup", signUpData);
  },
  testApi: () => {
    return axios.get("https://dog.ceo/api/breeds/image/random");
  },
  signOut: () => {
    return axios.get("/api/logout");
  }
};
