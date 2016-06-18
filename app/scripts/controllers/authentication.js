'use strict';
/**
 * @ngdoc function
 * @name countytraceApp.controller:AuthCtrl
 * @description
 * # AuthCtrl
 * Controller of the countytraceApp
 */
angular.module('countytraceApp')
    .controller('AuthCtrl', function($scope, $cookies, $localStorage, $rootScope, AuthService, $location) {
        $scope.newUser = {};
        $scope.user = {};
        $scope.noLoginEmail = false;
        $scope.noLoginPassword = false;
        $scope.accountNonExistent = false;
        $scope.wrongCredentials = false;
        $rootScope.userInformation=$localStorage.userInformation;

        $scope.noName = false;
        $scope.noEmail = false;
        $scope.noPassword = false;
        $scope.noPasswordConfirm = false;
        $scope.passwordMismatch = false;
        $scope.noTermsAgreement = false;
        $scope.emailExists = false;

        $scope.showButton = true;
        $scope.loadingRipple = false;


        $scope.createAccount = function() {
            if ($scope.newUser.name == "" || $scope.newUser.name == undefined) {
                $scope.noName = true;
            } else if ($scope.newUser.email == "" || $scope.newUser.email == undefined) {
                $scope.noName = false;
                $scope.noEmail = true;
            } else if ($scope.newUser.password == "" || $scope.newUser.password == undefined) {
                $scope.noName = false;
                $scope.noEmail = false;
                $scope.noPassword = true;
            } else if ($scope.newUser.passwordConfirm == "" || $scope.newUser.passwordConfirm == undefined) {
                $scope.noName = false;
                $scope.noEmail = false;
                $scope.noPassword = false;
                $scope.noPasswordConfirm = true;
            } else if ($scope.newUser.password != $scope.newUser.passwordConfirm) {
                $scope.noName = false;
                $scope.noEmail = false;
                $scope.noPassword = false;
                $scope.noPasswordConfirm = false;
                $scope.passwordMismatch = true;
            } else if ($scope.newUser.termsAgreement == undefined || $scope.newUser.termsAgreement == "false") {
                $scope.noName = false;
                $scope.noEmail = false;
                $scope.noPassword = false;
                $scope.noPasswordConfirm = false;
                $scope.passwordMismatch = false;
                $scope.noTermsAgreement = true;
            } else {
                $scope.showButton = false;
                $scope.loadingRipple = true;
                var user = AuthService.createUser($scope.newUser);
                user.$promise.then(function(successResponse) {
                    console.log(successResponse.Status);
                    if (successResponse.Status == 'Email Exists') {
                        $scope.emailExists = true;
                        toastr.warning("The email already exists");
                    } else {
                        $scope.emailExists = false;
                        var date = new Date();
                        date.setDate(date.getDate() + 7);
                        var userToken = successResponse.Token;
                        $cookies.putObject("authToken", userToken, {
                            expires: date
                        });
                        $localStorage.userInformation=successResponse;
                        $rootScope.userInformation=successResponse;
                        $location.path("/");
                        $location.replace();
                    }
                }, function(error) {
                    toastr.warning("An error occured. Please try again");
                }).finally(function() {
                    $scope.showButton = true;
                    $scope.loadingRipple = false;
                });
            }
        };

        $scope.login = function() {
            if ($scope.user.email == "" || $scope.user.email == undefined) {
                $scope.noLoginEmail = true;
            } else if ($scope.user.password == "" || $scope.user.password == undefined) {
                $scope.noLoginEmail = false;
                $scope.noLoginPassword = true;
            } else {
                $scope.showButton = false;
                $scope.loadingRipple = true;

                if($scope.user.loginType=='citizen'){
                  var user = AuthService.loginUser($scope.user);
                }
                else if($scope.user.loginType=='leader'){
                  var user = AuthService.loginLeader($scope.user);
                }

                user.$promise.then(function(successResponse) {

                    if (successResponse.Status == 'User Not Found') {
                        $scope.accountNonExistent = true;
                        toastr.warning("No Account with this Email Exists. Please Create an account");
                    } else if (successResponse.Status == 'Wrong Password') {
                        $scope.accountNonExistent = false;
                        $scope.wrongCredentials = true;
                    }
                    else if (successResponse.Status == 'Already Logged In') {
                        $scope.accountNonExistent = false;
                        $scope.wrongCredentials = false;
                        toastr.info("You are already Logged In");
                        $rootScope.userInformation=successResponse;
                    }
                    else {
                        $scope.accountNonExistent = false;
                        $scope.wrongCredentials = false;
                        var date = new Date();
                        date.setDate(date.getDate() + 7);
                        var userToken = successResponse.Token;
                        $cookies.putObject("authToken", userToken, {
                            expires: date
                        });
                        $localStorage.userInformation=successResponse;
                        $rootScope.userInformation=successResponse;
                        $location.path("/");
                        $location.replace();

                    }
                }, function(error) {
                    toastr.warning("An error occured. Please try again");
                }).finally(function() {
                    $scope.showButton = true;
                    $scope.loadingRipple = false;
                });

            }
        };

        $scope.logout= function(){
          var user=AuthService.logout();
          user.$promise.then(function(successResponse){
              toastr.info('You have been Logged out');
              $localStorage.$reset();
              $cookies.remove("authToken");
              $location.path('/home');
              $location.replace();

          }, function(error){
            toastr.warning("An error occured while trying to log you out. Please try again");
          }).finally(function(){

          })
        };
    });
