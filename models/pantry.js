module.exports = function(sequelize, DataTypes) {
  var Pantry = sequelize.define("Pantry", {
    home_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: "Homes",
      referencesKey: "id"
    },
    upc: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    item_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    best_by: {
      type: DataTypes.STRING
    },
    date_in: {}
  });

  return Pantry;
};
