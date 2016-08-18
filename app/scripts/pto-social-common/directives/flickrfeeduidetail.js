'use strict';

/**
 * @ngdoc directive
 * @name flickYerApp.directive:flickrFeedUIDetail
 * @description
 * # flickrFeedUIDetail
 */
angular.module('pto.social.common')
  .directive('flickrFeedUiDetail', function () {
    return {
      templateUrl: 'views/pto-social-common/flickrFeedUIDetail.html',
      restrict: 'E',
      scope: {
        model: '=ngModel'
      },
      controllerAs: 'flkrUiDetailCtlr',
      controller: function ($scope) {
        var vm = this;
        vm.model = $scope.model;
      }
    };
  });
