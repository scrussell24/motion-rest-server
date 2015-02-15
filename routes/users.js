var models  = require('../models');
var express = require('express');
var router  = express.Router();

// get all users
router.get('/', function(req, res) {
  models.User.findAll({
    include: [ models.Task ]
  }).then(function(users) {
    res.writeHead(200, { 'Content-Type': 'application/json'});
    res.end(JSON.stringify(users));
  });
});

// get user by id
router.get('/:user_id', function(req, res) {

  models.User.find({
    where: {id: req.params.user_id},
    include: [models.Task]
  }).then(function(user) {
    res.writeHead(200, { 'Content-Type': 'application/json'});
    res.end(JSON.stringify(user));
  });
});


//create new user
router.post('/', function(req, res) {

  models.User.create({
    username: req.body.username
  }).then(function(result) {
    res.writeHead(200, { 'Content-Type': 'application/json'});
    res.end(JSON.stringify(result));
  });
});

//delete user by id
router.delete('/:user_id', function(req, res) {

  models.User.find({
    where: {id: req.params.user_id},
    include: [models.Task]
  }).then(function(user) {
    models.Task.destroy(
        {where: {UserId: user.id}}
    ).then(function(affectedRows) {
          user.destroy().then(function(rows) {
            res.writeHead(200, { 'Content-Type': 'application/json'});
            res.end(JSON.stringify(rows));
          });
        });
  });
});

// update user by id
router.put('/:user_id', function(req, res) {

  models.User.find({
    where: {id: req.params.user_id}
  }).then(function(user) {
    models.User.update(
        {username: req.body.username},
        {where: {id: user.id}}
  ).then(function(rows) {
            res.writeHead(200, { 'Content-Type': 'application/json'});
            res.end(JSON.stringify(rows));
    });
  });
});

// create new task for userid
router.post('/:user_id/tasks', function (req, res) {
  models.User.find({
    where: { id: req.params.user_id }
  }).then(function(user) {
    models.Task.create({
      title: req.param('title')
    }).then(function(task) {
      task.setUser(user).then(function() {
        res.writeHead(200, { 'Content-Type': 'application/json'});
        res.end(JSON.stringify(task));
      });
    });
  });
});

// delete task
router.delete('/:user_id/tasks/:task_id', function (req, res) {
  models.User.find({
    where: { id: req.params.user_id }
  }).then(function(user) {
    models.Task.find({
      where: { id: req.params.task_id }
    }).then(function(task) {
      task.setUser(null).then(function() {
        task.destroy().then(function() {
          res.writeHead(200, { 'Content-Type': 'application/json'});
          res.end(JSON.stringify(task));
        });
      });
    });
  });
});

router.put('/:user_id/tasks/:task_id', function(req, res) {

  models.Task.find({
    where: {id: req.params.task_id}
  }).then(function(task) {
    models.Task.update(
        {title: req.body.title},
        {where: {id: task.id}}
    ).then(function(rows) {
          res.writeHead(200, { 'Content-Type': 'application/json'});
          res.end(JSON.stringify(rows));
        });
  });
});

module.exports = router;