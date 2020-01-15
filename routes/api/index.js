// Requiring our models and passport as we've configured it
var db = require("../../models");
var passport = require("../../config/passport");
var router = require("express").Router();

// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
router.post("/login", passport.authenticate("local"), function(req, res) {
  res.json(req.user);
});

// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
router.post("/signup", function(req, res) {
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
  res.json({ message: "Logging out" });
});

// Route for getting some data about our user to be used client side
router.get("/user_data", function(req, res) {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({ response: "User Not Logged In" });
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

router.post("/get/users", function(req, res) {
  db.User.findAll({
    where: {
      home_id: req.body.home_id
    }
  }).then(function(dbUser) {
    res.json(dbUser);
  });
});

// Grabbing all chores by the user's home_id
router.post("/get/chores", function(req, res) {
  db.Chore.findAll({
    where: {
      home_id: req.body.home_id
    }
  }).then(function(dbChore) {
    res.json(dbChore);
  });
});

router.post("/add/chores", function(req, res) {
  db.Chore.create({
    home_id: req.body.home_id,
    chore_name: req.body.chore_name,
    created_by: req.body.created_by,
    assigned_user: req.body.assigned_user,
    point_value: req.body.point_value,
    start_date_time: req.body.start_date_time,
    end_date_time: req.body.end_date_time,
    repeats: req.body.repeats,
    repeat_interval: req.body.repeat_interval
  })
    .then(function(dbChore) {
      res.json(dbChore);
    })
    .catch(function(err) {
      res.status(401).json(err);
    });
});

// Grabbing all pets by the user's home_id
router.post("/get/pets", function(req, res) {
  db.Pets.findAll({
    where: {
      home_id: req.body.home_id
    }
  }).then(function(dbPets) {
    res.json(dbPets);
  });
});

router.post("/add/pets", function(req, res) {
  db.Pets.create({
    home_id: req.body.home_id,
    pet_name: req.body.pet_name,
    age: req.body.age,
    animal_type: req.body.animal_type,
    primary_vet_id: req.body.primary_vet_id,
    emergency_vet_id: req.body.emergency_vet_id
  })
    .then(function(dbPets) {
      res.json(dbPets);
    })
    .catch(function(err) {
      res.status(401).json(err);
    });
});

// Grabbing all pantry items by the user's home_id
router.post("/get/pantry", function(req, res) {
  db.Pantry.findAll({
    where: {
      home_id: req.body.home_id
    }
  }).then(function(dbPantry) {
    res.json(dbPantry);
  });
});

router.post("add/pantry", function(req, res) {
  db.Pantry.create({
    home_id: req.body.home_id,
    upc: req.body.upc,
    item_name: req.body.item_name,
    quantity: req.body.quantity,
    best_by: req.body.best_by,
    date_in: req.body.date_in,
    date_out: req.body.date_out
  })
    .then(function(dbPantry) {
      res.json(dbPantry);
    })
    .catch(function(err) {
      res.status(401).json(err);
    });
});

module.exports = router;
