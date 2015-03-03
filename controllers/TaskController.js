/**
 * Created by splizmo on 2/23/15.
 */
var models  = require('../models');

module.exports = {
    create: {
        auth : isProjectAuthorizedForUser
    },
    list:{
        auth : isProjectAuthorizedForUser
    },
    read : {
        auth : isTaskAuthorizedForUser
    },
    update : {
        auth : isTaskAuthorizedForUser
    },
    delete :{
        auth : isTaskAuthorizedForUser
    }
};

function isTaskAuthorizedForUser(req, res, context){

    models.Task.find({
        where: {id: req.params.id}
    }).then(function(task) {

        models.Project.find({
            where: {id: task.ProjectId}
        }).then(function(project) {

            if( req.isAuthenticated() && req.user.id === project.UserId ){
                context.continue();
            } else{
                res.status(403).json({ error: "Invalid User ID" });
                context.stop();
            }
        });

    });
}

function isProjectAuthorizedForUser(req, res, context){

    console.log(req.user.id);
    console.log(req.params.ProjectId);

    models.Project.find({
        where: {id: req.params.ProjectId}
    }).then(function(project) {

        if( req.isAuthenticated() && req.user.id === project.UserId ){
            context.continue();
        } else{
            res.status(403).json({ error: "Invalid User ID" });
            context.stop();
        }
    });
}

