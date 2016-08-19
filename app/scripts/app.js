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
    'pto.social.common' // Ideally this would be a Bower dependency
  ])
  .constant('TweenMax', window.TweenMax)
  .config(function ($routeProvider, $locationProvider, $compileProvider, $httpProvider) {
    $locationProvider.html5Mode(false);
    
    // ---------- Angular 1.3 new stuff -----------
    $compileProvider.debugInfoEnabled(false);  // 'false' to increase performance
    $httpProvider.useApplyAsync(true);        // http://blog.thoughtram.io/angularjs/2015/01/14/exploring-angular-1.3-speed-up-with-applyAsync.html
    // --------------------------------------------

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl as socialCtlr'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
