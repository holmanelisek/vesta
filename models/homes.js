module.exports = function(sequelize, DataTypes) {
  var Homes = sequelize.define("Homes", {
    lat: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    long: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    home_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    admin_user_id: {
      type: DataTypes.INTEGER,
      references: "User",
      referencesKey: "id",
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
