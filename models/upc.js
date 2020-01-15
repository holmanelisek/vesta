module.exports = function(sequelize, DataTypes) {
    var UPCDATA = sequelize.define("UPCDATA", {
      home_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      brand: {
          type: DataTypes.STRING,
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
  
    return UPCDATA;
  };
