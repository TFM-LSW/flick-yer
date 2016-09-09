'use strict';

/**
 * @ngdoc directive
 * @name flickYerApp.directive:flickrFeedUIList
 * @description
 * # flickrFeedUIList
 */
angular.module('pto.social.common')
  .component('flickrFeedUiList', {
    template: `
      <p ng-if="$ctrl.loadingFlickrFeed">Loading feed...</p>
      <section class="pto-social_flickr-feed-container" ng-show="!$ctrl.showDetail">
          <article class="pto-social_flickr-feed-row" ng-repeat="item in $ctrl.feedListFormatted track by $index">
              <div class="pto-social_flickr-image" ng-click="$ctrl.gotoDetail(item)" ng-style="{'background-image': 'url(' + item.image + ')'}"></div>
              <div class="pto-social_flickr-info">
                  <h2 ng-click="$ctrl.gotoDetail(item)">{{item.title}}</h2>
                  <small class="hideOnDesktop">Published {{item.formattedDate}} at {{item.formattedTime}}<br></small>
                  <small><a ng-href="https://www.flickr.com/photos/{{item.authorId}}" target="_blank">{{item.authorName}}</a></small>
                  <small class="hideOnTablet">Published {{item.formattedDate}} at {{item.formattedTime}}</small>
                  <small><a href="{{item.link}}" target="_blank">View on Flickr</a></small>
              </div>
          </article>
      </section>
      <flickr-feed-ui-detail class="pto-social_flickr-detail" reveal="$ctrl.showDetail" ng-model="$ctrl.selectedDetail" close="$ctrl.closeDetail()"></flickr-feed-ui-detail>
    `,
    restrict: 'EA',
    bindings: {
      tags: '=',
      reveal: '='
    },
    controller: function ($scope, $timeout, flickrFeedService) {
      var vm = this;
      vm.showDetail = false;
      vm.feedListFormatted = [];
      vm.selectedDetail = {};
      vm.loadingFlickrFeed = true;
      vm.tags = this.tags;
      
      $timeout(function() {
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

      this.$postLink = function () {

      };
    }
  });
