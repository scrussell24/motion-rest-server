var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
  models.Project.findAll({
    include: [ models.Task ]
  }).then(function(projects) {
    res.render('index', {
      title: 'Base Single Page Application',
      users: projects
    });
  });
});

module.exports = router;
