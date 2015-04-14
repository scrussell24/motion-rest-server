var demoControllers = angular.module('demoControllers');

demoControllers.controller('DashboardCtrl', ['$scope', 'Security', function($scope, Security) {

    var GRAPH_LENGTH = 60;
    var firstDate = getFirstDate(GRAPH_LENGTH);
    // chart
    var graph = new Array();
    //init
    for( var i = 0 ; i < GRAPH_LENGTH ; i ++ ){
        graph[i] = 0;
    }

    // scope variables
    $scope.webcamURL = 'http://' + location.hostname + ':8081';
    $scope.pathToSnapShots = 'images/motion/';
    $scope.securities = Security.query({sort:'-id',count:'1000'});
    $scope.snapCount = [1,2,3,4,5];

    $scope.securities.$promise.then(function(){
        populateChart();
    });

    // google chart stuff
    $scope.chart = {
        "type": "AreaChart",
        "cssStyle": "height:200px; width: 100%;",
        "options": {
            "fill": 20,
            "displayExactValues": true,
            "vAxis": {
                "gridlines": {
                    "count": 6
                }
            },
            "hAxis": {
            }
        },
        "formatters": {},
        "displayed": true
    };

    $scope.chart.data = {
        "cols": [
            {id: "timestamp", label: "timestamp", type: "string"},
            {id: "motion-id", type: "number"}
        ], "rows": [
        ]
    };


    var populateChart = function() {

        var hour = firstDate.getHours();

        for( var i = 0 ; i < $scope.securities.length ; i++){

            var tokens =  $scope.securities[i].time_stamp.split('.');
            var currentDate = $scope.securities[i].time_stamp.split('.')[0].replace('T', ' ');

            if(Date.parse(currentDate) > Date.parse(firstDate)) {
                var minutes = tokens[0].split(':')[1];
                minutes = parseInt(minutes);
                graph[minutes] = graph[minutes] + 1;
            }
        }

        for( var i = 0 ; i < GRAPH_LENGTH ; i++ ){
            if( (firstDate.getMinutes() + i) % 60 == 0)
                hour++;
            if( (firstDate.getMinutes() + i) % 5 == 0 ){
                $scope.chart.data.rows.push({
                    c: [
                        {v: hour + ':' + (firstDate.getMinutes() + i) % 60},
                        {v: graph[(firstDate.getMinutes() + i) % 60]}
                    ]
                });
            } else{
                $scope.chart.data.rows.push({
                    c: [
                        {},
                        {v: graph[(firstDate.getMinutes() + i) % 60]}
                    ]
                });
            }
        }
    }

}]);

var getFirstDate = function(minutes){

    var date = new Date();
    date.setMinutes( date.getMinutes() - minutes);
    return date;
}

var getSQLString = function(date){
    return '\'' + date.getFullYear() + '-' +
            (date.getMonth()+1) + '-' +
            date.getDate() + ' ' +
            date.getHours() + ':' +
            date.getMinutes() + '\'';
}
