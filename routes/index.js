var models  = require('../models');
var express = require('express');
var passport = require('passport');
var utils = require('../utils');
var router  = express.Router();

router.get('/', function(req, res) {
    res.render('index');
});

router.post('/login',
    passport.authenticate('local', { failureRedirect: '/#/login', failureFlash: true }),
    function(req, res) {
        res.status(200).json({ username:req.user.username });
    }
);

router.get('/logout',
    function(req, res){
        req.logout();
        res.status(200).json({message:'logged out successfully'});
    }
);

router.get('/username',
    function(req, res){
        if(req.isAuthenticated()) {
            res.status(200).json({ username:req.user.username });
        } else{
            res.status(403).json({ error: "User not authenticated" });
        }
    }
);

router.post('/signup',
    function(req, res){

        var newSalt = utils.getSalt();

        models.User.create({
           username:req.body.username,
            password:utils.getHash(req.body.password,newSalt),
            email:req.body.email,
            salt:newSalt
        }).then(function(user) {
            res.status(200).json({ message: "User created" });
        });
    }
);

module.exports = router;
