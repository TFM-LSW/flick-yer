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
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element) {
        element.text('this is the flickrFeedUIDetail directive');
      }
    };
  });
