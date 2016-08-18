'use strict';

/**
 * @ngdoc overview
 * @name flickYerApp
 * @description
 * # flickYerApp
 *
 * Main module of the application.
 */
angular
  .module('flickYerApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'pto.social.common'
  ])
  .constant(
    'BREAKPOINTS', {
      'desktop': 800
    }
  )
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl as socialCtlr'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
