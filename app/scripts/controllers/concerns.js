'use strict';
/**
 * @ngdoc function
 * @name countytraceApp.controller:AuthCtrl
 * @description
 * # AuthCtrl
 * Controller of the countytraceApp
 */
angular.module('countytraceApp')
    .controller('ConcernsCtrl', function($scope, $location, $routeParams,  $rootScope, ConcernsService) {
      $scope.showConcern=function(id){
        $location.path('/concern/'+id);
        $location.replace();
      };

      $scope.gridOptions = {
            enableSorting: true,
            exporterMenuCsv: false,
            enableGridMenu: true,
            enablePinning: true,
            // enablePaging: true,
            enableHighlighting: true,
            rowTemplate: '<div id="concernListItem" ng-click="grid.appScope.showConcern(row.entity.publicConcernId)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
            paginationPageSize: 3,
            useExternalPagination: true,
            columnDefs: [{
                name: 'publicConcernName',
                enableHiding: false,
                displayName: "Name"
            }, {
                name: 'publicConcernDescription',
                enableHiding: false,
                displayName: "Description"
            }, {
                name: 'citizenName',
                displayName: "Raised by"
            },{
                name: 'addressee',
                displayName: "Adressed To"
            },
            {
                name: 'blockName',
                displayName: "Block"
            }],
        };



        $scope.getAllConcerns = function() {
            var concerns = ConcernsService.getAllConcerns();
            concerns.$promise.then(function(successResp) {
                    $scope.gridOptions.data = successResp;
                },
                function(error) {}).finally(function() {});
        };


        $scope.getAllConcerns();

    });
