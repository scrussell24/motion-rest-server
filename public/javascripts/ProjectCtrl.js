/**
 * Created by splizmo on 2/16/15.
 */
// Angular controller
var demoControllers = angular.module('demoControllers');

demoControllers.controller('ProjectCtrl', ['$scope', 'Project', function($scope, Project) {

    $scope.projects = Project.query();

    $scope.addProject = function() {
        $scope.newProject = new Project();
        $scope.newProject.title = $scope.newTitle;
        $scope.newProject.$save(function() {
            //console.log("successfully saved " + $scope.newProject.title);
            $scope.projects.push($scope.newProject);
        });

        $scope.newTitle = '';
    };

    $scope.deleteProject = function(project) {
        Project.delete({},{id:project.id}, function(data){
            console.log("successfully deleted " + JSON.stringify(data));
            remove($scope.projects, project);
        });
    };

    $scope.updateProject = function(project) {
        Project.update({},{id:project.id , title:project.title}, function(){
            //console.log("successfully updated " + project.title);
        });
    };

    function remove( projects , project ){
        $.each(projects, function(i){
            if(projects[i].id === project.id) {
                projects.splice(i,1);
                return false;
            }
        });
    }
}]);

