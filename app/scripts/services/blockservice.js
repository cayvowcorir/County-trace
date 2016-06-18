'use strict';

angular.module('countytraceApp').factory('BlockService', function($resource, $rootScope) {
    return {
        getInfo: function(id){
          var info=$resource($rootScope.serverUrlBase+'/counties/:countyId');
          return info.get({countyId: id});
        },
        getBlockList:function(level){
          var list=$resource($rootScope.serverUrlBase+'/:level/list');
          return list.query({level:level});
        }
    };
});
