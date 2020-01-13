import axios from "axios";

// Export an object containing methods we'll use for accessing the Dog.Ceo API

export default {
  isSignedIn: function() {
    return axios.get("/api/user_data");
  },
  signIn: function(signInData) {
    return axios.post("/api/login", signInData);
  },
  signUp: function(signUpData) {
    return axios.post("/api/signup", signUpData);
  }
};
