
var app = angular.module('app', ['ngRoute','controllers','services','slick']);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'partials/readme.html',
                controller: 'DashboardCtrl'
            }).
            when('/demo', {
                templateUrl: 'partials/dashboard.html',
                controller: 'DashboardCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);