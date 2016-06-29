'use strict';
/**
 * @ngdoc function
 * @name countytraceApp.controller:ConcernProfCtrl
 * @description
 * # ConcernProfCtrl
 * Controller of the countytraceApp
 */
angular.module('countytraceApp')
    .controller('ConcernProfileCtrl', function($scope, $routeParams,  $rootScope, ConcernsService) {
      $scope.concernDetails={};
      $scope.concernImagesArr=[];

        $scope.getConcern=function(){
          var concern=ConcernsService.getConcern($routeParams.id);
          concern.$promise.then(function(successResponse){
            $scope.concernDetails=successResponse;
          },function(){

          }).finally(function(){

          });
        };

        $scope.getConcernImages=function(){
          var concernImages=ConcernsService.getConcernImages($routeParams.id);
          concernImages.$promise.then(function(successResponse){
            $scope.concernImagesArr=successResponse;
          },function(error){

          }).finally(function(){

          });
        };

        $scope.getConcern();
        $scope.getConcernImages();
        // angular.element('.scrollspy').scrollSpy();
        // angular.element('.carousel').carousel();

    });
