'use strict';

/**
 * @ngdoc function
 * @name flickYerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the flickYerApp
 */
angular.module('flickYerApp')
  .controller('MainCtrl', function ($scope, flickrFeedService, $log) {
    var vm = this;
    vm.getFeed = function () {
      vm.apiFailure = false;
      return flickrFeedService.getFeed('patato').then(function(data) {
        vm.data = data;
        $log.log(vm.data);
        vm.apiFailure = false;
      }, function () {
        vm.apiFailure = true;
      }).catch(function() {
        vm.apiFailure = true;
      });
    };
    vm.getFeed();
  });
