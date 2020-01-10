//Chore object dynamically created
//    Chore ID (automatically generated)
//    Home ID (automatically attached)
//    Chore name (required, from user input)
//    User ID
//    Points
//    Pet ID 
//    Start Date/Time
//    End Date/Time
//    Repeat
//    Repeat Time (D W M Y)



module.exports = function(sequelize, DataTypes){
    var Chore = sequelize.define("Chore", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        chore_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        assigned_user: {
            type: DataTypes.INTEGER,
        },
        point_value: {
            type: DataTypes.INTEGER,
        },
        start_date_time: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ,//time of creation,
        },
        end_date_time: {
            type: DataTypes.STRING,
        },
        repeats: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        repeat_interval: {
            type: DataTypes.STRING,
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        completed_by: {
            type: DataTypes. INTEGER,
            allowNull: false,
        }
    })

    Chore.associate = function(models){
        Chore.belongsTo (models.Home, {
            foreignKey: {
                allowNull: false
            }
        })
    }
}


//TO DO
//view all chores
//view chores based on house ID (sort by start date?)
//mark chore as completed
//confirm chore as completed/delete chore/add points to user account