'use strict';

/**
 * @ngdoc overview
 * @name countytraceApp
 * @description
 * # countytraceApp
 *
 * Main module of the application.
 */
angular
  .module('countytraceApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.grid',
    'ngStorage',
    'ngFileUpload',
    'ngImgCrop'
  ])
  .config(function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/counties/:countyId', {
        templateUrl: 'views/county.html',
        controller: 'CountyCtrl',
        controllerAs: 'county'
      })
      .when('/users/new', {
        templateUrl: 'views/register.html',
        controller: 'AuthCtrl',
        controllerAs: 'auth'
      })
      .when('/users/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthCtrl',
        controllerAs: 'auth'
      })
       .when('/concern/:id', {
        templateUrl: 'views/concernprofile.html',
        controller: 'ConcernProfileCtrl',
        controllerAs: 'concern'
      })
       .when('/project/:id', {
        templateUrl: 'views/projectprofile.html',
        controller: 'ProjectProfileCtrl',
        controllerAs: 'concern'
      })
       .when('/concerns', {
        templateUrl: 'views/concerns.html',
        controller: 'ConcernsCtrl',
        controllerAs: 'concern'
      })
       .when('/projects', {
        templateUrl: 'views/projects.html',
        controller: 'ProjectsCtrl',
        controllerAs: 'concern'
      })
      .otherwise({
        redirectTo: '/'
      });


      $httpProvider.interceptors.push('httpRequestInterceptor');
      //$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';


  }).run(function($rootScope){
    $rootScope.serverUrlBase="http://localhost:8000";
  })
  .factory('httpRequestInterceptor', function($cookies) {
    return {
        request: function(config) {

            config.headers['X-API-TOKEN'] = $cookies.getObject("authToken");

            return config;
        }
    };
});
