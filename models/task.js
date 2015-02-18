/**
 * Created by splizmo on 2/14/15.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Task = sequelize.define("Task", {
        title: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                Task.belongsTo(models.Project);
            }
        }
    });

    return Task;
};