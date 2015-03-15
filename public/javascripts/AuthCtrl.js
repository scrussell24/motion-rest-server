/**
 * Created by splizmo on 2/23/15.
 */
// Angular controller
var demoControllers = angular.module('demoControllers');

demoControllers.controller('AuthCtrl', ['$scope', '$http', function($scope , $http) {

    $scope.isAuth = false;
    $scope.username = '';

    $http.get('/username').success(function (data) {
        $scope.username = data.username;
        $scope.isAuth = true;
    });

    $scope.logout = function(){

        $http.get('/logout').success(function (data) {
            $scope.username = '';
            $scope.isAuth = false;
        });
    }

    $scope.login = function(user){

        $http.post('/login', {username:user.username,password:user.password}).success(function (data) {

            if( data.username ){
                $scope.username = user.username;
                $scope.isAuth = true;
            } else {
                console.log("invalid credentials");
            }
        });
    }

    $scope.signup = function(user){

        $http.post('/signup' , {username:user.username,password:user.password,email:user.email}).success(function (data) {
            $scope.login(user);
        });
    }

}]);