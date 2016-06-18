'use strict';
/**
 * @ngdoc function
 * @name countytraceApp.controller:AuthCtrl
 * @description
 * # AuthCtrl
 * Controller of the countytraceApp
 */
angular.module('countytraceApp')
    .controller('ProjectsCtrl', function($scope, ProjectsService, $location, $routeParams,  $rootScope) {
      $scope.showProject=function(id){
        $location.path('/project/'+id);
        $location.replace();
      };

      $scope.gridOptions = {
            enableSorting: true,
            exporterMenuCsv: false,
            enableGridMenu: true,
            enablePinning: true,
            // enablePaging: true,
            enableHighlighting: true,
            rowTemplate: '<div id="concernListItem" ng-click="grid.appScope.showProject(row.entity.projectId)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
            paginationPageSize: 3,
            useExternalPagination: true,
            columnDefs: [{
                name: 'projectName',
                enableHiding: false,
                displayName: "Name"
            }, {
                name: 'projectDescription',
                enableHiding: false,
                displayName: "Description"
            }, {
                name: 'citizenName',
                displayName: "Initiated by:"
            },{
                name: 'projectBudget',
                displayName: "Budget"
            },
            {
                name: 'projectStatus',
                displayName: "Status"
            },
            {
                name: 'blockName',
                displayName: "Block"
            }],
        };



        $scope.getAllProjects = function() {
            var projects = ProjectsService.getAllProjects();
            projects.$promise.then(function(successResp) {
                    $scope.gridOptions.data = successResp;
                },
                function(error) {}).finally(function() {});
        };

        $scope.showProject=function(id){
          $location.path('/project/'+id);
          $location.replace();
        };


        $scope.getAllProjects();

    });
