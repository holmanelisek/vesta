module.exports = function(sequelize, DataTypes) {
  var Pets = sequelize.define("Pets", {
    home_id: {
      type: DataTypes.INTEGER,
      required: true,
      allowNull: false
    },
    pet_name: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER
    },
    animal_type: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false
    },
    primary_vet: {
      type: DataTypes.INTEGER
    },
    emergency_vet: {
      type: DataTypes.INTEGER
    }
  });

  return Pets;
};
