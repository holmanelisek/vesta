// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require("bcryptjs");
// Creating our User model
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER
    },
    phone_number: {
      type: DataTypes.STRING
    },
    parent: {
      type: DataTypes.BOOLEAN
    },
    points: {
      type: DataTypes.INTEGER
    },
    home_id: {
      type: DataTypes.INTEGER,
      references: "homes",
      referencesKey: "id"
    },
    secondary_id: {
      type: DataTypes.INTEGER,
      references: "homes",
      referencesKey: "id"
    },
    tertiary_id: {
      type: DataTypes.INTEGER,
      references: "homes",
      referencesKey: "id"
    },
    quaternary_id: {
      type: DataTypes.INTEGER,
      references: "homes",
      referencesKey: "id"
    }
  });
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
  return User;
};
