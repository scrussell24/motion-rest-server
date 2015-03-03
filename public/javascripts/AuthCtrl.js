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

    $scope.login = function(username,password){

        $http.post('/login', {username:username,password:password}).success(function (data) {

            if( data.username ){
                $scope.username = username;
                $scope.isAuth = true;
            } else {
                console.log("invalid credentials");
            }
        });
    }

    $scope.signup = function(username,password,email){
        $http.post('/signup' , {username:username,password:password,email:email}).success(function (data) {
            $scope.login(username,password);
        });
    }

}]);