
module.exports = function(sequelize, DataTypes) {
    var Security = sequelize.define("Security", {
        camera: DataTypes.INTEGER,
        filename: DataTypes.STRING,
        frame: DataTypes.INTEGER,
        file_type: DataTypes.INTEGER,
        time_stamp: DataTypes.DATE
    });

    return Security;
};