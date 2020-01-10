module.exports = function(sequelize, DataTypes) {
  var Vets = sequelize.define("Vets", {
    practice_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false
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
    email: {
      type: DataTypes.STRING
    },
    emergency_clinic: {
      type: DataTypes.BOOLEAN
    }
  });

  return Vets;
};
