var controllers = angular.module('controllers');

controllers.controller('DashboardCtrl', ['$scope', 'Security','$sce', function($scope, Security, $sce) {

    // scope variables
    $scope.pathToSnapShots = 'images/motion/';
    $scope.webcamURL1 = $sce.trustAsResourceUrl('http://' + location.hostname + ':8081');
    $scope.webcamURL2 = $sce.trustAsResourceUrl('http://' + location.hostname + ':8082');
    $scope.webcamURL3 = $sce.trustAsResourceUrl('http://' + location.hostname + ':8083');
    $scope.webcamURL4 = $sce.trustAsResourceUrl('http://' + location.hostname + ':8084');

    Security.query({sort:'-id',count:'1000'}).$promise.then(function(response){
        $scope.securities = response;
        $scope.currentSlide = $scope.securities[1];
    });
    $scope.snapCount = $.map($(Array(50)),function(val, i) {
        return i;
    });

    $('#slick').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        $scope.$apply(function(){
            $scope.currentSlide = $scope.securities[nextSlide + 1]
        });
    });

}]);


