/**
 * Created by splizmo on 2/16/15.
 */
// Angular controller
var demoControllers = angular.module('demoControllers');

demoControllers.controller('ProjectDetailCtrl', ['$scope', '$routeParams', 'Project' , 'Task', function($scope, $routeParams, Project , Task) {

    $scope.project = Project.get({id: $routeParams.projectId});

    $scope.addTask = function() {
        $scope.newTask = new Task();
        $scope.newTask.title = $scope.newTitle;
        $scope.newTask.$save( {projectId : $scope.project.id} ,function() {
            //console.log("successfully saved ");
            $scope.project.Tasks.push($scope.newTask);
        });

        $scope.newTitle = '';
    };

    $scope.updateTask = function(task) {
        Task.update( {} , { projectId:$scope.project.id ,id:task.id, title:task.title} ,function() {
            //console.log("successfully updated ");
        });
    };

    $scope.deleteTask = function(task) {
        Task.delete({},{ projectId:$scope.project.id ,id:task.id}, function(){
            //console.log("successfully deleted " + project.title);
            remove($scope.project.Tasks, task);
        });
    };

    function remove( tasks , task ){
        $.each(tasks, function(i){
            if(tasks[i].id === task.id) {
                tasks.splice(i,1);
                return false;
            }
        });
    }

}]);