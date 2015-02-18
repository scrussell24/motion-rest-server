/**
 * Created by splizmo on 2/16/15.
 */
var models  = require('../models');
var express = require('express');
var router  = express.Router();

// get all projects
router.get('/', function(req, res) {

    models.Project.findAll({
        include: [ models.Task ]
    }).then(function(projects) {
        res.writeHead(200, { 'Content-Type': 'application/json'});
        res.end(JSON.stringify(projects));
    });
});

// get project by id
router.get('/:project_id', function(req, res) {

    models.Project.find({
        where: {id: req.params.project_id},
        include: [models.Task]
    }).then(function(project) {
        res.writeHead(200, { 'Content-Type': 'application/json'});
        res.end(JSON.stringify(project));
    });
});


//create new project
router.post('/', function(req, res) {

    models.Project.create({
        title: req.body.title
    }).then(function(result) {
        res.writeHead(200, { 'Content-Type': 'application/json'});
        res.end(JSON.stringify(result));
    });
});

//delete project by id
router.delete('/:project_id', function(req, res) {

    models.Project.find({
        where: {id: req.params.project_id},
        include: [models.Task]
    }).then(function(project) {
        models.Task.destroy(
            {where: {ProjectId: project.id}}
        ).then(function(affectedRows) {
                project.destroy().then(function(rows) {
                    res.writeHead(200, { 'Content-Type': 'application/json'});
                    res.end(JSON.stringify(rows[0]));
                });
            });
    });
});

// update project by id
router.put('/:project_id', function(req, res) {

    models.Project.find({
        where: {id: req.params.project_id}
    }).then(function(project) {
        models.Project.update(
            {title: req.body.title},
            {where: {id: project.id}}
        ).then(function(rows) {
                res.writeHead(200, { 'Content-Type': 'application/json'});
                res.end(JSON.stringify(rows[0]));
            });
    });
});

// create new task for projectid
router.post('/:project_id/tasks', function (req, res) {
    models.Project.find({
        where: { id: req.params.project_id }
    }).then(function(project) {
        models.Task.create({
            title: req.body.title
        }).then(function(task) {
            task.setProject(project).then(function() {
                res.writeHead(200, { 'Content-Type': 'application/json'});
                res.end(JSON.stringify(task));
            });
        });
    });
});

// delete task
router.delete('/:project_id/tasks/:task_id', function (req, res) {
    models.Project.find({
        where: { id: req.params.project_id }
    }).then(function(project) {
        models.Task.find({
            where: { id: req.params.task_id }
        }).then(function(task) {
            task.setProject(null).then(function() {
                task.destroy().then(function() {
                    res.writeHead(200, { 'Content-Type': 'application/json'});
                    res.end(JSON.stringify(task));
                });
            });
        });
    });
});

//update task
router.put('/:project_id/tasks/:task_id', function(req, res) {

    models.Task.find({
        where: {id: req.params.task_id}
    }).then(function(task) {
        models.Task.update(
            {title: req.body.title},
            {where: {id: task.id}}
        ).then(function(rows) {
                res.writeHead(200, { 'Content-Type': 'application/json'});
                res.end(JSON.stringify(rows[0]));
            });
    });
});

module.exports = router;
