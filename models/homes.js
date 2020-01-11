module.exports = function(sequelize, DataTypes) {
  var Homes = sequelize.define("Homes", {
    lat: {
      type: DataTypes.INTEGER
    },
    longitude: {
      type: DataTypes.INTEGER
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    zip: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    home_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    master_key: {
      type: DataTypes.STRING,
      allowNull: false
    },
    invitation_key: {
      type: DataTypes.STRING
    }
  });

  return Homes;
};
