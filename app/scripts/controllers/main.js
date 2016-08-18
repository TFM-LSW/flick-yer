'use strict';

/**
 * @ngdoc function
 * @name flickYerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the flickYerApp
 */
angular.module('flickYerApp')
  .controller('MainCtrl', function () {
    var vm = this;
    vm.flickr = {
      tags: ['potato']
    };
  });
