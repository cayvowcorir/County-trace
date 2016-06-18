'use strict';

angular.module('countytraceApp').factory('AuthService', function($rootScope, $resource){
  return{
    createUser: function(user){
      var userResource=$resource($rootScope.serverUrlBase+'/users/new');
      return userResource.save(user);
    },
    loginUser: function(user){
      var userResource=$resource($rootScope.serverUrlBase+'/users/login');
      return userResource.save(user);
    },
    loginLeader: function(user){
      var userResource=$resource($rootScope.serverUrlBase+'/leaders/login');
      return userResource.save(user);
    },
    logout: function(){
      var user=$resource($rootScope.serverUrlBase+'/users/logout');
      return user.save();
    }
  };
});
