// Requiring our models and passport as we've configured it
var db = require("../../models");
var passport = require("../../config/passport");
var router = require("express").Router();

// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
router.post("/api/login", passport.authenticate("local"), function(req, res) {
  res.json(req.user);
});

// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
router.post("/api/signup", function(req, res) {
  db.User.create({
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
    first_name: req.body.fName,
    last_name: req.body.lName
  })
    .then(function(dbUser) {
      res.json(dbUser);
    })
    .catch(function(err) {
      res.status(401).json(err);
    });
});

// Route for logging user out
router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

// Route for getting some data about our user to be used client side
router.get("/api/user_data", function(req, res) {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({response: "User Not Logged In"});
  } else {
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      id: req.user.id,
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      home_id: req.user.home_id
    });
  }
});

module.exports = router;
