module.exports = function(sequelize, DataTypes) {
  var UpcData = sequelize.define("UpcData", {
    home_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    brand: {
      type: DataTypes.STRING
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    upc: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return UpcData;
};
