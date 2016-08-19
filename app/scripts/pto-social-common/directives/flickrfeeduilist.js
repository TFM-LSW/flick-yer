'use strict';

/**
 * @ngdoc directive
 * @name flickYerApp.directive:flickrFeedUIList
 * @description
 * # flickrFeedUIList
 */
angular.module('pto.social.common')
  .directive('flickrFeedUiList', function ($timeout, flickrFeedService) {
    return {
      templateUrl: 'views/pto-social-common/flickrFeedUIList.html',
      restrict: 'EA',
      scope: {
        tags: '=',
        reveal: '='
      },
      controllerAs: 'flkrUiListCtlr',
      controller: function ($scope) {
        var vm = this;
        vm.showDetail = false;
        vm.feedListFormatted = [];
        vm.selectedDetail = {};
        vm.loadingFlickrFeed = true;
        
        $timeout(function() {
          vm.tags = $scope.tags;
          vm.getFeed();
        });

        vm.getFeed = function () {
          vm.apiFailure = false;
          return flickrFeedService.getFeed(vm.tags.toString()).then(function(data) {
            vm.feedList = data;
            vm.loadingFlickrFeed = false;
            reformatList();
            vm.apiFailure = false;
          }, function () {
            vm.apiFailure = true;
            vm.loadingFlickrFeed = false;
          }).catch(function() {
            vm.apiFailure = true;
            vm.loadingFlickrFeed = false;
          });
        };

        function reformatList () {
          for (var index = 0; index < vm.feedList.length; index++) {
            var element = vm.feedList[index];
            var newItem = {
              formattedDate: flickrFeedService.getFormattedDate(element.published),
              formattedTime: flickrFeedService.getFormattedTime(element.published),
              authorName: flickrFeedService.getAuthorName(element.author),
              /* jshint ignore:start */
              authorId: element.author_id,
              /* jshint ignore:end */
              title: element.title,
              link: element.link,
              image: element.media.m,
              tags: element.tags.split(' ')
            };
            
            vm.feedListFormatted[index] = newItem;
          }
        }

        vm.gotoDetail = function (item) {
          vm.showDetail = true;
          vm.selectedDetail = item;
        };

        vm.closeDetail = function () {
          vm.showDetail = false;
        };
      }
    };
  });
