'use strict';

angular.module('countytraceApp').factory('ProjectsService', function($resource, $rootScope) {
    return {
        getProjects: function(blockId){
          var projects=$resource($rootScope.serverUrlBase+'/:blockId/projects');
          return projects.query({blockId:blockId});
        },
        newProject: function(project){
          var projects=$resource($rootScope.serverUrlBase+'/projects/new');
          return projects.save(project);
        },
        getAllProjects: function(){
          var projects=$resource($rootScope.serverUrlBase+'/projects/get/all');
          return projects.query();
        },
        getProject: function(id){
          var project=$resource($rootScope.serverUrlBase+'/projects/:id');
          return project.get({id:id});
        }

    };
});
