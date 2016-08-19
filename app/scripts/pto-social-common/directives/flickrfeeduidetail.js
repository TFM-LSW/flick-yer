'use strict';

/**
 * @ngdoc directive
 * @name flickYerApp.directive:flickrFeedUIDetail
 * @description
 * # flickrFeedUIDetail
 */
angular.module('pto.social.common')
  .directive('flickrFeedUiDetail', function ($log, TweenMax) {
    return {
      templateUrl: 'views/pto-social-common/flickrFeedUIDetail.html',
      restrict: 'E',
      scope: {
        model: '=ngModel',
        reveal: '=',
        close: '&'
      },
      controllerAs: 'flkrUiDetailCtlr',
      controller: function ($scope) {
        var vm = this;
        vm.model = $scope.model;
      },
      link: function postLink(scope, element, attr, ctlr) {
        var elem = angular.element(element)[0];
        scope.$watch('reveal', function (newVal, oldVal) {
          if (newVal === oldVal) {
            TweenMax.set(elem, { css: {autoAlpha:0, top:60, scale: 1}, force3D:true, transformOrigin: 'center center' } );
            return;
          }
          if (newVal) {
            TweenMax.set(elem, { css: {scale: 1}, force3D:true, transformOrigin: 'center center' } );
            TweenMax.to(elem, 0.3, { css: {autoAlpha:1, top:0}, ease:'Sine.easeOut' } );
          } else {
            TweenMax.to(elem, 0.3, { css: { autoAlpha:0, top:60, scale: 0.6}, force3D:true, transformOrigin: 'center center', ease: 'Power2.easeOut'} );
          }
        });

        ctlr.selectTag = function (tag) {
          //TODO: refresh the social feed based on the tag parameter...
          $log.log(tag);
        };
      }
    };
  });