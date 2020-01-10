module.exports = function(sequelize, DataTypes) {
  var Notes = sequelize.define("Notes", {
    home_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    chore_id: {
      type: DataTypes.INTEGER
    },
    urgent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    note: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Notes;
};
