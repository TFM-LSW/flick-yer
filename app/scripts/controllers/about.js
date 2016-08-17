'use strict';

/**
 * @ngdoc function
 * @name flickYerApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the flickYerApp
 */
angular.module('flickYerApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
