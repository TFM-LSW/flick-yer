'use strict';

/**
 * @ngdoc directive
 * @name flickYerApp.directive:flickrFeedUIList
 * @description
 * # flickrFeedUIList
 */
angular.module('pto.social.common')
  .directive('flickrFeedUiList', function (flickrFeedService, $timeout) {
    return {
      templateUrl: 'views/pto-social-common/flickrFeedUIList.html',
      restrict: 'EA',
      scope: {
        tags: '='
      },
      controllerAs: 'flkrUiListCtlr',
      controller: function ($scope) {
        var vm = this;
        
        $timeout(function() {
          vm.tags = $scope.tags;
          vm.getFeed();
        });

        vm.getFeed = function () {
          vm.apiFailure = false;
          return flickrFeedService.getFeed(vm.tags.toString()).then(function(data) {
            vm.feedList = data;
            vm.apiFailure = false;
          }, function () {
            vm.apiFailure = true;
          }).catch(function() {
            vm.apiFailure = true;
          });
        };

        var MMMM = ['\x00', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        vm.getFormattedDate = function (publishedObj) {
          var time = new Date(publishedObj);
          var date = time.getDate();
          var month = MMMM[time.getMonth()];
          var year = time.getFullYear();
          var display = date + ' ' + month + ' ' + year;

          return display;
        };

        vm.getFormattedTime = function (publishedObj) {
          var time = new Date(publishedObj);
          return time.getHours() + ':' + time.getMinutes();
        };

        vm.getAuthorName = function (nameString) {
          var start = parseInt(nameString.indexOf(' (')) +2;
          var name = nameString.slice(start, nameString.length-1);
          return name;
        };
      }
    };
  });
