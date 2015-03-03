var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var sequelize = require("sequelize");
var models  = require('./models');
var rest = require('epilogue');
var routes = require('./routes/index');
var projectController = require('./controllers/ProjectController');
var taskController = require('./controllers/TaskController');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(session({ secret: 'mr rogers secret garden', resave: false, saveUninitialized:false }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


rest.initialize({
    app: app,
    sequelize: sequelize,
    updateMethod: "PUT"
});

var projects = rest.resource({
    model: models.Project,
    endpoints: ['/projects', '/projects/:id']
});
projects.use(projectController);

var tasks = rest.resource({
    model: models.Task,
    endpoints: ['/projects/:ProjectId/tasks', '/projects/:ProjectId/tasks/:id']
});
tasks.use(taskController);

app.use('/', routes);

function findById(id, fn) {

    models.User.find({
        where: {id: id}
    }).then(function(user) {
        fn(null, user);
    });
}

function findByUsername(username, fn) {

    models.User.find({
        where: {username: username}
    }).then(function(user) {
        fn(null, user);
    });
}

//   the user by ID when deserializing.
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {

            findByUsername(username, function(err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
                if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
                return done(null, user);
            })
        });
    }
));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
