module.exports = function(sequelize, DataTypes) {
    var UPCDATA = sequelize.define("UPCDATA", {
      home_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      title: {
          type: DataTypes.STRING,
          allowNull: false
      },
      upc: {
          type: DataTypes.STRING,
          allowNull: false
      },
      brand: {
          type: DataTypes.STRING,
      }
    });
  
    return UPCDATA;
  };
