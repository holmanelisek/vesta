module.exports = function(sequelize, DataTypes) {
  var Pets = sequelize.define("Pets", {
    home_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: "Homes",
      referencesKey: "id"
    },
    pet_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER
    },
    animal_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    primary_vet: {
      type: DataTypes.INTEGER,
      references: "veterinarians",
      referencesKey: "id"
    },
    emergency_vet: {
      type: DataTypes.INTEGER,
      references: "veterinarians",
      referencesKey: "id"
    }
  });

  return Pets;
};
