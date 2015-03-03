/**
 * Created by splizmo on 2/21/15.
 */
var models  = require('../models');

module.exports = {
    create: {
        write:{
            before : function(req, res, context) {
                req.body.UserId = req.user.id;
                context.continue();
            }
        },
        auth : isAuthenticated
    },
    list:{
        fetch : {
            before : function(req, res, context) {
                context.criteria = {UserId:req.user.id};
                context.continue();
            }
        },
        auth : isAuthenticated
    },
    read : {
        auth : isProjectAuthorizedForUser
    },
    update : {
        auth : isProjectAuthorizedForUser
    },
    delete :{
        auth : isProjectAuthorizedForUser
    }
};

function isProjectAuthorizedForUser(req, res, context){

    models.Project.find({
        where: {id: req.params.id}
    }).then(function(project) {

        if( req.isAuthenticated() && req.user.id === project.UserId ){
            context.continue();
        } else{
            res.status(403).json({ error: "Invalid User ID" });
            context.stop();
        }
    });
}

function isAuthenticated(req, res, context) {
    if (req.isAuthenticated()) {
        context.continue();
    } else{
        res.status(403).json({ error: "User not authenticated" });
        context.stop();
    }
}
