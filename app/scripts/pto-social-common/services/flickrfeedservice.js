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
    var MMMM = ['\x00', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return {
      getFeed: function(tags) {
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
      },
      getFormattedDate: function (publishedObj) {
        var time = new Date(publishedObj);
        var date = time.getDate();
        var month = MMMM[time.getMonth()];
        var year = time.getFullYear();
        var display = date + ' ' + month + ' ' + year;
        return display;
      },
      getFormattedTime: function (publishedObj) {
        var time = new Date(publishedObj);
        return time.getHours() + ':' + time.getMinutes();
      },
      getAuthorName: function (nameString) {
        var start = parseInt(nameString.indexOf(' (')) +2;
        var name = nameString.slice(start, nameString.length-1);
        return name;
      }
    };
  });