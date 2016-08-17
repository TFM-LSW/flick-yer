'use strict';

/**
 * @ngdoc service
 * @name flickYerApp.flickrFeedService
 * @description
 * # flickrFeedService
 * Service in the flickYerApp.
 */
angular.module('pto.social.common')
  .service('flickrFeedService', function ($q, $http) {
    var ms = this;
    var API_BASE_URL = 'https://api.flickr.com/services/feeds/photos_public.gne';

    ms.getFeed = function(tags) {
      var deferred = $q.defer();
      var flickrAPI = API_BASE_URL + '?jsoncallback=JSON_CALLBACK' + '&tags=' + encodeURIComponent(tags) + '&tagmode=all' + '&format=json';

      $http.jsonp(flickrAPI)
        .success(function (data) {
          ms.feedData = data;
          deferred.resolve(ms.feedData.items);
        })
        .error(function(error) {
          deferred.reject(error);
        })
        .catch(function(error) {
          deferred.reject(error);
        });

      return deferred.promise;
    };
  });