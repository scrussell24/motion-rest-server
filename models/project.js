/** Created by splizmo on 2/16/15 ...*/
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Project = sequelize.define("Project", {
        title: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                Project.hasMany(models.Task)
            }
        }
    });

    return Project;
};