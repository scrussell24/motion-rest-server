/**
 * Created by splizmo on 2/14/15.
 */
// Angular controller
var demoApp = angular.module('demoApp', ['ngRoute']);

demoApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/users', {
                templateUrl: 'partials/users.html',
                controller: 'userCtrl'
            }).
            when('/user/:userId', {
                templateUrl: 'partials/user-detail.html',
                controller: 'taskCtrl'
            }).
            otherwise({
                redirectTo: '/users'
            });
    }]);

demoApp.controller('userCtrl', function ($scope, $http) {

    $scope.users = {};

    $http.get('/users').success(function (data) {
        $scope.users = data;
    });

    $scope.addUser = function() {

        $http.post('/users', {username:$scope.newUsername}).
            success(function(data, status, headers, config) {
                //console.log("success : " + data);
                $scope.users.push(data);
            }).
            error(function(data, status, headers, config) {
                console.log("error");
            });
        $scope.newUsername = '';
    };

    $scope.deleteUser = function(user) {

        $http.delete('/users/' + user.id).
            success(function(data, status, headers, config) {
                //console.log("success : " + data);
                $.each($scope.users, function(i){
                    if($scope.users[i].id === user.id) {
                        $scope.users.splice(i,1);
                        return false;
                    }
                });
            }).
            error(function(data, status, headers, config) {
                console.log("error");
            });
    };


    $scope.updateUser = function(user) {

        $http.put('/users/' + user.id, {username:user.username}).
            success(function(data, status, headers, config) {
                //console.log("success : " + data);
            }).
            error(function(data, status, headers, config) {
                console.log("error");
            });
    };
});


demoApp.controller('taskCtrl', function ($scope, $http, $routeParams) {

    $scope.userId = $routeParams.userId;
    $scope.user;

    $http.get('/users/' + $scope.userId).success(function (data) {
        $scope.user = data;

    });

    $scope.addTask = function() {

        $http.post( '/users/' + $scope.userId + '/tasks', {title:$scope.newTask}).
            success(function(data, status, headers, config) {
                //console.log("success : " + data);
                $scope.user.Tasks.push(data);
            }).
            error(function(data, status, headers, config) {
                console.log("error");
            });
        $scope.newTask = '';
    };

    $scope.deleteTask = function(task) {

        $http.delete('/users/' + $scope.userId + '/tasks/' + task.id).
            success(function(data, status, headers, config) {
                //console.log("success : " + data);
                $.each($scope.user.Tasks, function(i){
                    if($scope.user.Tasks[i].id === task.id) {
                        $scope.user.Tasks.splice(i,1);
                        return false;
                    }
                });
            }).
            error(function(data, status, headers, config) {
                console.log("error");
            });
    };

    $scope.updateTask = function( task ) {

        $http.put('/users/' + $scope.userId + '/tasks/' + task.id, {title:task.title}).
            success(function(data, status, headers, config) {
               //console.log("success : " + data);
            }).
            error(function(data, status, headers, config) {
                console.log("error");
            });
    };
});




