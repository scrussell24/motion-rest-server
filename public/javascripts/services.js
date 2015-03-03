/**
 * Created by splizmo on 2/16/15.
 */
var demoServices = angular.module('demoServices', ['ngResource']);

demoServices.factory('Project', ['$resource',
    function($resource){
        return $resource('projects/:id', {}, {
            update: {method: "PUT", params:{id:'@id'}},
            delete: {method:'DELETE', params:{id:'@id'} , isArray:true}
        });
    }]);

demoServices.factory('Task', ['$resource',
    function($resource){
        return $resource('projects/:ProjectId/tasks/:id', {}, {
            save: {method: "POST", params:{ProjectId:'@ProjectId'}},
            update: {method: "PUT", params:{ProjectId:'@ProjectId' ,id:'@id'}},
            delete: {method:'DELETE', params:{ProjectId:'@ProjectId' ,id:'@id'}, isArray:true}
        });
    }]);