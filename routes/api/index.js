// Requiring our models and passport as we've configured it
require('dotenv').config();
var db = require("../../models");
var passport = require("../../config/passport");
var router = require("express").Router();
const { Op } = require("sequelize");

//Bcrypt
var bcrypt = require("bcryptjs");
const saltRounds = 10;

//Amazon S3 and photouploading packages
var aws = require('aws-sdk');
aws.config.region = "us-east-2";
var Bucket_Name = process.env.S3_BUCKET;
var User_Key = process.env.AWS_ACCESS_KEY;
var Secret_Key = process.env.AWS_SECRET_ACCESS_KEY;

//-------------------------------//
//-----Upload to Amazon S3-------//
//-------------------------------//
router.get('/sign-s3', function (req, res) {
  var s3 = new aws.S3({
    accessKeyId: User_Key,
    secretAccessKey: Secret_Key,
  });

  var fileName = req.query['file-name'];
  var fileType = req.query['file-type'];
  var uniqueName = Date.now() + "" + fileName;
  var s3Params = {
    Bucket: Bucket_Name,
    Key: uniqueName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, function (err, data) {
    if (err) {
      console.log(err);
      return res.end();
    }
    var returnData = {
      signedRequest: data,
      url: "https://" + Bucket_Name + ".s3.amazonaws.com/" + uniqueName
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
});

//------------------------------//
//----------User Routes---------//
//------------------------------//
// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
router.post("/login", passport.authenticate("local"), function (req, res) {
  console.log("===================================")
  console.log("[User Log In - 61]")
  console.log("===================================")
  res.json(req.user);
});

// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
router.post("/signup", function (req, res) {
  console.log("===================================")
  console.log("[Sign Up - 71]")
  console.log("===================================")
  db.User.create({
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
    first_name: req.body.fName,
    last_name: req.body.lName,
    points: 0
  })
    .then(function (dbUser) {
      req.login(dbUser, function (err) {
        if (err) {
          console.log(err);
        }
      })
      res.json(dbUser);
    })
    .catch(function (err) {
      console.log(err.errors[0].message)
      res.status(401).json({ error: err.errors[0].message });

    });
});

//Remove user from home
router.post("/users/remove_from_home", (req, res) => {
  console.log("===================================")
  console.log("[Remove User From home - 98]")
  console.log("===================================")
  db.User.update({
    home_id: null,
    points: 0
  },
    {
      where: {
        id: req.body.user_id
      }
    }).then(response => {
      console.log(response)
      res.json(response)
    }).catch(err => {
      console.log(err)
      res.status(401).json(err)
    })
})

// Route for joining a home
router.post("/users/join_home", (req, res) => {
  console.log("===================================")
  console.log("[Users Join Home - 119]")
  console.log("===================================")
  db.User.update({
    home_id: req.body.home_id
  },
    {
      where: {
        id: req.body.user_id
      }
    }).then(reponse => {
      res.json({
        data: reponse,
        message: "Joined Successfully",
        success: true
      })
    }).catch(err => {
      res.status(401).json(err);
    })
})

// Route for logging user out
router.get("/logout", function (req, res) {
  console.log("===================================")
  console.log("[Log Out - 142]")
  console.log("===================================")
  req.logout();
  res.json({ message: "Logging out" });
});

// Route for getting some data about our user to be used client side
router.get("/user_data", function (req, res) {
  console.log("===================================")
  console.log("[Get User Data - 151]")
  console.log("===================================")
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({ response: "User Not Logged In" });
  } else {
    // Otherwise perform API call to find users updated information then send information back to client
    db.User.findOne({
      where: {
        id: req.user.id
      }
    }).then(function (dbUser) {
      res.json({
        id: dbUser.id,
        username: dbUser.username,
        email: dbUser.email,
        first_name: dbUser.first_name,
        last_name: dbUser.last_name,
        home_id: dbUser.home_id,
        points: dbUser.points
      });
    });
  }
});

//Get all users by home id
router.post("/get/users", function (req, res) {
  console.log("===================================")
  console.log("[Get all users in Home - 178]")
  console.log("===================================")
  db.User.findAll({
    where: {
      home_id: req.body.home_id
    }
  }).then(function (dbUser) {
    res.json(dbUser);
  });
});

//Update user account info
// Post for changing the 'completed' to true
router.post("/users/account_update", (req, res) => {
  console.log("===================================")
  console.log("[Account Information Update - 193]")
  console.log("===================================")
  db.User.update(
    {
      [req.body.field]: req.body.value
    },
    {
      where: {
        id: req.body.user_id
      }
    }
  )
    .then(function (dbUpdatedUser) {
      res.json(dbUpdatedUser);
    })
    .catch(function (err) {
      res.json(err);
    });
});

//Updating user password
router.post("/users/password_update", (req, res) => {
  console.log("===================================")
  console.log("[Account Password Update - 216]")
  console.log("===================================")
  //Find users old password in database
  db.User.findOne({
    where: {
      id: req.body.user_id
    }
  }).then(dbUser => {
    //Compare database password with user input old password
    bcrypt.compare(req.body.old_password, dbUser.password)
      .then(result => {
        //if result === true
        if (result) {
          //Hash the new password
          bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
            //update the db with the new hased password
            db.User.update({
              password: hash
            }, {
              where: {
                id: req.body.user_id
              }
            }).then(userData => {
              //return userData
              res.json(userData)
            }).catch(err => {
              //return error
              res.status(401).json(err.errors[0].message)
            })
          })
          //if result === false
        } else {
          //return failure
          res.json({
            update: "Failed",
            message: "Incorrect old password"
          })
        }
      })
  })
})

router.post("/users/add_points", (req, res) => {
  console.log(req.body)
  db.User.update({
    points: req.body.points
  }, {
    where: {
      id: req.body.id
    }
  })
    .then(pointData => {
      res.json(pointData)
    }).catch(err => {
      console.log(err)
    })
})

//------------------------------//
//----------Home Routes---------//
//------------------------------//
// Route to create home
router.post("/home/create", (req, res) => {
  console.log("===================================")
  console.log("[Create Home -264]")
  console.log("===================================")
  db.Homes.create({
    home_name: req.body.home_name,
    home_admin: req.body.home_admin,
    master_key: req.body.master_key,
    invitation_key: req.body.invitation_key,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip
  }).then(homeData => {
    res.json(homeData)
  }).catch(err => {
    res.status(401).json(err);
  })
})

//Route to update home address
router.post("/home/update_address", (req, res) => {
  console.log("===================================")
  console.log("[Update Home Address - 285]")
  console.log("===================================")
  db.Homes.update({
    home_name: req.body.home_name,
    street: req.body.home_street,
    city: req.body.home_city,
    state: req.body.home_state,
    zip: req.body.home_zip,
    master_key: req.body.master_key,
    invitation_key: req.body.home_key,
    home_admin: req.body.home_admin
  },
    {
      where: {
        id: req.body.home_id
      }
    }).then(homeData => {
      res.json(homeData)
    }).catch(err => {
      res.status(401).json({ error: err.errors[0].message });
    })
})

// Route for finding home by invitation key
router.get("/home/find_by_key/:id", (req, res) => {
  console.log("===================================")
  console.log("[Find Home by Home Key - 311]")
  console.log("===================================")
  db.Homes.findOne({
    where: {
      invitation_key: req.params.id
    }
  }).then(house => {
    res.json({
      id: house.id,
      home_name: house.home_name,
      city: house.city,
      state: house.state
    })
  })
    .catch(err => {
      res.json(err)
    })
})

// Route for finding home by home id
router.get("/home/find_by_id/:id", (req, res) => {
  console.log("===================================")
  console.log("[Find home by Home Id - 333]")
  console.log("===================================")
  db.Homes.findOne({
    where: {
      id: req.params.id
    }
  }).then(house => {
    res.json({
      id: house.id,
      home_name: house.home_name,
      street: house.street,
      city: house.city,
      state: house.state,
      zip: house.zip,
      invitation_key: house.invitation_key,
      home_admin: house.home_admin
    })
  })
    .catch(err => {
      res.json(err)
    })
});

//Route for getting master key from home
router.post("/home/master_key/retrieve", (req, res) => {
  console.log("===================================")
  console.log("[Get master key - 359]")
  console.log("===================================")
  db.Homes.findOne({
    where: {
      id: req.body.home_id
    }
  }).then(dbHome => {
    if (dbHome.home_admin === req.body.user_id) {
      res.json({
        message: "Retrieve Successful",
        master_key: dbHome.master_key
      })
    } else {
      res.json({
        message: "Retrieve Unsuccessful",
        master_key: null
      })
    }
  })
});

//------------------------------//
//---------Chore Routes---------//
//------------------------------//
// Grabbing all chores by the user's home_id
router.post("/get/chores", function (req, res) {
  console.log("===================================")
  console.log("[Get all chores by home - 386]")
  console.log("===================================")
  db.Chore.findAll({
    where: {
      home_id: req.body.home_id
    }
  }).then(function (dbChore) {
    res.json(dbChore);
  });
});

router.post("/add/chores", function (req, res) {
  console.log("===================================")
  console.log("[Add chore - 399]")
  console.log("===================================")
  db.Chore.create({
    home_id: req.body.home_id,
    chore_name: req.body.chore_name,
    created_by: req.body.created_by,
    assigned_user: req.body.assigned_user,
    point_value: req.body.point_value,
    start_date_time: req.body.start_date_time,
    end_date_time: req.body.end_date_time,
    repeats: req.body.repeats,
    repeat_interval: req.body.repeat_interval,
    completed: req.body.completed,
    completed_by: req.body.completed_by
  })
    .then(function (dbChore) {
      res.json(dbChore);
    })
    .catch(function (err) {
      res.status(401).json(err);
    });
});

router.post("/delete/chores", function (req, res) {
  console.log("===================================")
  console.log("[Delete Chores - 424]")
  console.log("===================================")
  db.Chore.destroy({
    where: {
      id: req.body.chore_id
    }
  }).then(function (dbChore) {
    res.json(dbChore);
  }).catch(function (err) {
    res.json(err);
  })
})

// Post for changing the 'completed' to true
router.post("/edit/complete-chore", function (req, res) {
  console.log("===================================")
  console.log("[Complete Chore - 440]")
  console.log("===================================")
  db.Chore.update({
    completed: 1,
    completed_by: req.body.completed_by,
    completed_by_id: req.body.completed_by_id,
    completed_by_points: req.body.completed_by_points
  }, {
    where: {
      id: req.body.id
    }
  })
    .then(function (dbChore) {
      res.json(dbChore);
    })
    .catch(function (err) {
      res.json(err);
    });
});

// Post for changing the 'completed' to false
router.post("/edit/uncomplete-chore", function (req, res) {
  console.log("===================================")
  console.log("[Uncomplete Chore - 460]")
  console.log("===================================")
  db.Chore.update({
    completed: 0,
    completed_by: null,
    completed_by_id: null,
    completed_by_points: null
  }, {
    where: {
      id: req.body.id
    }
  })
    .then(function (dbChore) {
      res.json(dbChore);
    })
    .catch(function (err) {
      res.json(err);
    });
});


//------------------------------//
//----------Pet Routes----------//
//------------------------------//
// Grabbing all pets by the user's home_id
console.log("===================================")
console.log("[Get all pets by home ID - 483]")
console.log("===================================")
router.post("/get/pets", function (req, res) {
  db.Pets.findAll({
    where: {
      home_id: req.body.home_id
    }
  }).then(function (dbPets) {
    res.json(dbPets);
  });
});

// Add pet
router.post("/add/pet", function (req, res) {
  console.log("===================================")
  console.log("[Add pet - 498]")
  console.log("===================================")
  db.Pets.create({
    home_id: req.body.home_id,
    pet_name: req.body.pet_name,
    age: req.body.age,
    animal_type: req.body.animal_type,
    primary_vet_id: req.body.primary_vet_id,
    emergency_vet_id: req.body.emergency_vet_id,
    image_url: req.body.image_url
  })
    .then(function (dbPets) {
      res.json(dbPets);
    })
    .catch(function (err) {
      res.status(401).json(err);
    });
});

//Remove pet
router.post("/remove/pet/:id", function (req, res) {
  console.log("===================================")
  console.log("[Remove pet - 520]")
  console.log("===================================")
  db.Pets.destroy({
    where: {
      id: req.params.id
    }
  }).then(response => {
    res.json({
      remove: "successful",
      data: response
    })
  })
})


//------------------------------//
//----------Vet Routes----------//
//------------------------------//
//Route to get all vets from array
router.post("/get/vets", function (req, res) {
  console.log("===================================")
  console.log("[Get all vets by array of ids - 541]")
  console.log("===================================")
  db.Vets.findAll({
    where: {
      id: {
        [Op.or]: req.body.vets
      }
    }
  }).then(function (dbVets) {
    res.json(dbVets);
  }).catch(err => {
    res.status(401).json(err);
  })
});

//Route to get all vets
router.get("/get/all_vets", (req, res) => {
  console.log("===================================")
  console.log("[Get all pets - 559]")
  console.log("===================================")
  db.Vets.findAll({
  }).then(response => {
    res.json(response)
  })
})

//Route to add a vet
router.post("/add/vet", (req, res) => {
  console.log("===================================")
  console.log("[Add a vet - 570]")
  console.log("===================================")
  db.Vets.create({
    practice_name: req.body.practice_name,
    phone_number: req.body.phone_number,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    email: req.body.email,
    emergency_clinic: req.body.emergency_clinic
  }).then(response => {
    res.json({
      message: "Successful Creation",
      data: response
    })
  }).catch(err => {
    console.log(err)
    res.status(401).json({ error: err.errors[0].message });
  })
})

//------------------------------//
//------Pantry Routes-----------//
//-----------------------------//
// Grabbing all pantry items by the user's home_id
router.post("/get/pantry", function (req, res) {
  console.log("===================================")
  console.log("[Get all pantry by home id - 597]")
  console.log("===================================")
  db.Pantry.findAll({
    where: {
      home_id: req.body.home_id
    }
  }).then(function (dbPantry) {
    res.json(dbPantry);
  });
});

router.post("/get/pantryitem", function (req, res) {
  console.log("===================================")
  console.log("[Get pantry item by name and home id - 610]")
  console.log("===================================")
  db.Pantry.findAll({
    where: {
      home_id: req.body.home_id,
      item_name: name
    },
    order: [
      ['item_name', 'DESC']
    ]
  }).then(function (dbPantry) {
    res.json(dbPantry);
  })
})


router.post("/add/pantry", function (req, res) {
  console.log("===================================")
  console.log("[Add pantry item - 628]")
  console.log("===================================")
  db.Pantry.create({
    home_id: req.body.home_id,
    item_name: req.body.item_name,
    item_type: req.body.item_type,
    quantity: req.body.quantity,
    date_in: req.body.date_in,
  })
    .then(function (dbPantry) {
      console.log(dbPantry)
      res.json(dbPantry);
    })
    .catch(function (err) {
      res.status(401).json(err);
    });
});

router.post("/update/quantity", function (req, res) {
  console.log("===================================")
  console.log("[Update pantry item qt - 648]")
  console.log("===================================")
  db.Pantry.update({
    quantity: req.body.quantity
  }, {
    where: {
      id: req.body.id
    }
  })
    .then(function (dbPantry) {
      res.json(dbPantry);
    })
    .catch(function (err) {
      res.json(err);
    });
})

router.post("/delete/pantry", function (req, res) {
  console.log("===================================")
  console.log("[Delete pantry item - 667]")
  console.log("===================================")
  db.Pantry.destroy({
    where: {
      id: req.body.item_id
    }
  }).then(function (dbPantry) {
    res.json(dbPantry);
  }).catch(function (err) {
    res.json(err);
  })
})

module.exports = router;
