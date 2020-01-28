module.exports = function (sequelize, DataTypes) {
  var Pantry = sequelize.define("Pantry", {
    home_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    item_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    item_type: {
      type: DataTypes.STRING
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity_unit: {
      type: DataTypes.STRING,
      defaultValue: "unit",
      },
      low_quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    date_in: {
      type: DataTypes.STRING,
      allowNull: false
    },
      date_out: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      }
  });

  return Pantry;
};
