/**
 * Created by splizmo on 2/16/15.
 */
var demoApp = angular.module('demoApp', ['ngRoute','demoControllers','demoServices']);

demoApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/projects', {
                templateUrl: 'partials/projects.html',
                controller: 'ProjectCtrl'
            }).
            when('/projects/:projectId', {
                templateUrl: 'partials/project-detail.html',
                controller: 'ProjectDetailCtrl'
            }).
            otherwise({
                redirectTo: '/projects'
            });
    }]);