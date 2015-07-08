
var services = angular.module('services', ['ngResource']);

services.factory('Security', ['$resource',
    function($resource){
        return $resource('securities/:id', {}, {
            save: {method: "POST", params:{SecurityId:'@SecurityId'}},
            update: {method: "PUT", params:{SecurityId:'@SecurityId' ,id:'@id'}},
            delete: {method:'DELETE', params:{SecurityId:'@SecurityId' ,id:'@id'}, isArray:true}
        });
    }]);