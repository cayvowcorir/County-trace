'use strict';

angular.module('countytraceApp').factory('ConcernsService', function($resource, $rootScope) {
    return {
        getConcerns: function(blockId){
          var concerns=$resource($rootScope.serverUrlBase+'/concerns/get/:blockId');
          return concerns.query({blockId:blockId});
        },
        getBlockConcerns: function(){
          var concerns=$resource($rootScope.serverUrlBase+'/concerns/get');
          return concerns.query();
        },
        newConcern: function(concernDetails){
          var concern=$resource($rootScope.serverUrlBase+'/concerns/new');
          return concern.save(concernDetails);

        },
        getAllConcerns: function(){
          var concern=$resource($rootScope.serverUrlBase+'/concerns');
          return concern.query();
        },
        getConcern: function(id){
          var concern=$resource($rootScope.serverUrlBase+'/concerns/:id');
          return concern.get({id:id});
        }
    };
});
