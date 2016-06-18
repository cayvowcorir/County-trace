'use strict';
/**
 * @ngdoc function
 * @name countytraceApp.controller:ConcernProfCtrl
 * @description
 * # ConcernProfCtrl
 * Controller of the countytraceApp
 */
angular.module('countytraceApp')
    .controller('ProjectProfileCtrl', function($scope, $routeParams,  $rootScope, ProjectsService) {
      $scope.projectDetails={};

        $scope.getProject=function(){
          var project=ProjectsService.getProject($routeParams.id);
          project.$promise.then(function(successResponse){
            $scope.projectDetails=successResponse;
          },function(){

          }).finally(function(){

          });
        };

        $scope.getProject();
        angular.element('.scrollspy').scrollSpy();
        angular.element('.carousel').carousel();

    });
