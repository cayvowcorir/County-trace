'use strict';



/**
 * @ngdoc function
 * @name countytraceApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the countytraceApp
 */
angular.module('countytraceApp').controller('MainCtrl', function($scope, $rootScope, Upload, $timeout, $localStorage, $cookies, ProjectsService, BlockService, ConcernsService) {
    $scope.displayInfo = {};
    $scope.firstStep = true;
    $scope.noOfImages = [];
    $scope.concernImages = {};
    $scope.gridOptions = {
        enableSorting: true,
        exporterMenuCsv: false,
        enableGridMenu: true,
        //             paginationPageSize: 3,
        // useExternalPagination: true,
        // useExternalSorting: true,
        columnDefs: [{
            name: 'projectName',
            enableHiding: false,
            displayName: "Name"
        }, {
            name: 'projectDescription',
            enableHiding: false,
            displayName: "Description"
        }, {
            name: 'projectStatus',
            displayName: "Status"
        }, {
            name: 'projectRating',
            displayName: "Rating"
        }],
    };
    $rootScope.concerns = [];
    $scope.newConcern = {};
    $scope.leader={};
    $scope.blockList = [];
    $scope.blockConcerns = [];
    $scope.addresseeList = [];



    $scope.disableDropSelect = function(number) {
        angular.element('#dropBoxInner'+number).empty();
        angular.element('#croppedPreviewBox'+number).removeClass('hidden').addClass('thumbnail');
        angular.element('#dropBox'+number).attr('disabled', '');
    };



    $scope.$watch("newConcern.level, leader.level", function(newValue, oldValue) {
        if ($scope.newConcern.level == 'country') {
            $scope.blockList = [{
                'name': 'Kenya',
                'blockId': '48'
            }];
            $scope.leader.block = [{
                'name': 'Kenya',
                'blockId': '48'
            }];
            $scope.addresseeList = [{
                "name": "President",
                'value': '0'
            }, {
                'name': "Deputy President",
                'value': '1'
            }];
        } else if ($scope.newConcern.level == 'none') {
            $scope.blockList = [{
                'name': 'Block Name',
                'blockId': ''
            }];
            $scope.addresseeList = [{
                "name": "Select a Block Level First",
                'value': '0'
            }];
        } else {
            $scope.getBlockList();
            if ($scope.newConcern.level == 'county') {
                $scope.addresseeList = [{
                    "name": "Governor",
                    'value': '0'
                }, {
                    'name': "Deputy Governor",
                    'value': '1'
                }];
            } else if ($scope.newConcern.level == 'constituency') {
                $scope.addresseeList = [{
                    'name': "M.P.",
                    'value': '0'
                }, {
                    'name': "C.D.F. Chairperson",
                    'value': '1'
                }];
            } else {
                $scope.addresseeList = [{
                    'name': "M.C.A",
                    'value': '0'
                }];
            }
        }
    });

    $scope.$watch("newProject.level", function(newValue, oldValue) {
        if ($scope.newConcern.level == 'country') {
            $scope.blockList = [{
                'name': 'Kenya',
                'blockId': '48'
            }];
            $scope.addresseeList = [{
                "name": "President",
                'value': '0'
            }, {
                'name': "Deputy President",
                'value': '1'
            }];
        } else if ($scope.newConcern.level == 'none') {
            $scope.blockList = [{
                'name': 'Block Name',
                'blockId': ''
            }];
            $scope.addresseeList = [{
                "name": "Select a Block Level",
                'value': '0'
            }];
        } else {
            $scope.getBlockList();
            if ($scope.newConcern.level == 'county') {
                $scope.addresseeList = [{
                    "name": "Governor",
                    'value': '0'
                }, {
                    'name': "Deputy Governor",
                    'value': '1'
                }];
            } else if ($scope.newConcern.level == 'constituency') {
                $scope.addresseeList = [{
                    'name': "M.P.",
                    'value': '0'
                }, {
                    'name': "C.D.F. Chairperson",
                    'value': '1'
                }];
            } else {
                $scope.addresseeList = [{
                    'name': "M.C.A",
                    'value': '0'
                }];
            }
        }
    });

    angular.element('select').material_select();


    $scope.getProjects = function(blockId) {
        var projects = ProjectsService.getProjects(blockId);
        projects.$promise.then(function(successResp) {
                $scope.gridOptions.data = successResp;
            },

            function(error) {}).finally(function() {});
    };

    //  $scope.toConsole=function(item){
    //     console.log(angular.element("#concernImages").src);
    // };

    $scope.getConcerns = function(blockId) {
        var concerns = ConcernsService.getConcerns(blockId);
        concerns.$promise.then(function(successResp) {
                $scope.concerns = successResp;
            },

            function(error) {}).finally(function() {});
    };



    $scope.getBlockConcerns = function() {
        var concerns = ConcernsService.getConcerns();
        concerns.$promise.then(function(successResp) {
                $scope.blockConcerns = successResp;
            },

            function(error) {}).finally(function() {});
    };

    $scope.concernNextStep = function() {
        $scope.firstStep = false;
        $scope.secondStep = true;

    }

    $scope.concernGoBack = function() {
        $scope.firstStep = true;
        $scope.secondStep = false;

    }

    $scope.uploadConcernPhotos = function(dataUrl, name, concernId) {
        Upload.upload({
            url: $rootScope.serverUrlBase + '/concerns/' + concernId + '/images',
            data: {
                file: Upload.dataUrltoBlob(dataUrl, name)
            },
        }).then(function(response) {
            $timeout(function() {
                $scope.result = response.data;
            });
        }, function(response) {
            if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
        }, function(evt) {
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
        });
    };

    $scope.createConcern = function() {
        if ($scope.newConcern.title == "" || $scope.newConcern.title == undefined) {
            toastr.warning('Please Enter a Title');
        } else if ($scope.newConcern.description == "" || $scope.newConcern.description == undefined) {
            toastr.warning('Please Enter a Description');
        } else if ($scope.newConcern.level == "none") {
            toastr.warning('Please select a Block Level');
        } else if ($scope.newConcern.blockId == "" || $scope.newConcern.blockId == undefined) {
            toastr.warning('Please Select a Block Name');
        } else {


            var concern = ConcernsService.newConcern($scope.newConcern)
            concern.$promise.then(function(successResp) {
                if (successResp.code == '1') {

                  for(var i=1;i<=$scope.concernImages.Number;i++){

                    var croppedDataUrl = angular.element('#croppedPreviewBox'+i).attr('ng-src');

                    $scope.uploadConcernPhotos(croppedDataUrl, 'concernImage', successResp.concernId);
                  }
                    angular.element('#createConcern').modal('hide');
                    toastr.info('The Concern has been posted');

                } else if (successResp.Error == "Not Authorized") {
                    toastr.error("You are not logged in. You must be logged in to create a concern");
                } else
                    toastr.error('Oops! Something went wrong');
            }, function(error) {
                toastr.error('You need to be logged in to post a concern');
                console.log(error);
            }).finally(function() {

            });

        };
    };

    $scope.createProject = function() {
        if ($scope.newProject.name == "" || $scope.newProject.name == undefined) {
            toastr.warning('Please Enter a Project Name');
        } else if ($scope.newProject.description == "" || $scope.newProject.description == undefined) {
            toastr.warning('Please Enter a Description');
        } else if ($scope.newProject.status == "none") {
            toastr.warning('Please select the Project Status');
        } else if ($scope.newProject.publicConcernId == "" || $scope.newProject.publicConcernId == undefined) {
            toastr.warning('Please Select the Concerns being addressed');
        } else if ($scope.newProject.budget == "" || $scope.newProject.budget == undefined) {
            toastr.warning('Please enter the budget');
        } else {
            $scope.newProject.blockId = $rootScope.userInformation.Block;
            $scope.newProject.citizenId = $rootScope.userInformation.id;
            var project = ProjectsService.newProject($scope.newProject);
            project.$promise.then(function(successResp) {
                if (successResp.code == '1') {
                    angular.element('#createProject').modal('hide');
                    toastr.info('The Project has been posted');
                } else
                    toastr.error('Oops! Something went wrong');
            }, function(error) {
                toastr.error('Oops! Something went wrong');
            }).finally(function() {

            });

        };
    };

    $scope.getBlockList = function() {
        var list = BlockService.getBlockList($scope.newConcern.level);
        list.$promise.then(function(successResp) {
            angular.forEach(successResp, function(value, key) {
                var data = {
                    'name': value.name,
                    'blockId': value.blockId
                };

                $scope.blockList.push(data);
            });

        }, function(error) {

        }).finally(function() {

        })
    };

    $scope.getProjects('5');
    $scope.getConcerns('5');

    if ($rootScope.userInformation.IsLeader == '1') {
        $scope.getBlockConcerns();
    }

    $scope.refreshDom = function() {
        $scope.$apply();
    };



    // $scope.getCountyInfo=function(countyId){
    //   $scope.country=false;
    //   $scope.county=true;
    //    var data=CountyService.getInfo(countyId);
    //    data.$promise.then(function(successResp){
    //     console.log(successResp);
    //   }, function(error){}).finally(function(){});
    // };
    // $scope.displayCountryInfo=function(){
    //   $scope.county=false;
    //     $scope.country=true;
    // };



});
