/**
 * Created by splizmo on 2/16/15.
 */
var demoServices = angular.module('demoServices', ['ngResource']);

demoServices.factory('Project', ['$resource',
    function($resource){
        return $resource('projects/:id', {}, {
            update: {method: "PUT", params:{id:'@id'}},
            delete: {method:'DELETE', params:{id:'@id'}}
        });
    }]);

demoServices.factory('Task', ['$resource',
    function($resource){
        return $resource('projects/:projectId/tasks/:id', {}, {
            save: {method: "POST", params:{projectId:'@projectId'}},
            update: {method: "PUT", params:{projectId:'@projectId' ,id:'@id'}},
            delete: {method:'DELETE', params:{projectId:'@projectId' ,id:'@id'}}
        });
    }]);