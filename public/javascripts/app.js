
var demoApp = angular.module('demoApp', ['ngRoute','demoControllers','demoServices','googlechart']);

demoApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'partials/dashboard.html',
                controller: 'DashboardCtrl'
            }).
            when('/login', {
                templateUrl: 'partials/login.html',
                controller: 'AuthCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);