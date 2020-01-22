"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || "development";
var config = require(__dirname + "/../config/config.json")[env];
var db = {};

if (process.env.NODE_ENV === "production") {
  config = require(__dirname + "/../config/config.js")[env];
}

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter(function(file) {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(function(file) {
    var model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// USER ASSOCIATIONS
db.User.belongsTo(db.Homes, {
  as: "main",
  foreignKey: "home_id"
  // TODO in the future this will be required
  // required: true
});

db.User.belongsTo(db.Homes, {
  as: "two",
  foreignKey: "second_home_id"
});

db.User.belongsTo(db.Homes, {
  as: "three",
  foreignKey: "third_home_id"
});

db.User.belongsTo(db.Homes, {
  as: "four",
  foreignKey: "fourth_home_id"
});

// PETS ASSOCIATIONS
db.Pets.belongsTo(db.Homes, {
  as: "home",
  foreignKey: "home_id"
});

db.Pets.belongsTo(db.Vets, {
  as: "primary",
  foreignKey: "primary_vet_id"
});

db.Pets.belongsTo(db.Vets, {
  as: "emergency",
  foreignKey: "emergency_vet_id"
});

// PANTRY ASSOCIATIONS
db.Pantry.belongsTo(db.Homes, {
  as: "home",
  foreignKey: "home_id"
});

// CHORE ASSOCIATIONS
db.Chore.belongsTo(db.Homes, {
  as: "home",
  foreignKey: "home_id"
});

db.Chore.belongsTo(db.User, {
  as: "user",
  foreignKey: "created_by"
});

// NOTES ASSOCIATIONS
db.Notes.belongsTo(db.Homes, {
  as: "home",
  foreignKey: "home_id"
});

db.Notes.belongsTo(db.User, {
  as: "user",
  foreignKey: "user_id"
});

db.Notes.belongsTo(db.Chore, {
  as: "chore",
  foreignKey: "chore_id"
});

// db.UpcData.belongsTo(db.Homes, {
//   as: "home",
//   foreignKey: "home_id"
// });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
