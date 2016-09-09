'use strict';

/**
 * @ngdoc directive
 * @name flickYerApp.directive:flickrFeedUIDetail
 * @description
 * # flickrFeedUIDetail
 */
angular.module('pto.social.common')
  .directive('flickrFeedUiDetail', function ($log, TweenMax) {
    return {
      template: `
          <section>
            <button ng-click="close()" class="close">Back</button>
            <a href="{{model.link}}" target="_blank"><h2>{{model.title}}</h2></a>
            <div class="pto-social_flickr-image_detail" ng-style="{'background-image': 'url(' + model.image + ')'}"></div>
            <small><a ng-href="https://www.flickr.com/photos/{{model.authorId}}" target="_blank">{{model.authorName}}</a></small> | 
            <small>Published {{model.formattedDate}} at {{model.formattedTime}}</small>
            <p>Bacon ipsum dolor amet pancetta tongue short ribs beef shoulder bacon shank sausage short loin landjaeger bresaola brisket. Swine cow boudin, hamburger shoulder kevin prosciutto turducken meatball chicken. Sirloin pork chop turducken pig strip steak meatball cow salami kielbasa kevin capicola frankfurter. Tail chuck hamburger beef prosciutto leberkas kevin bacon pork belly sirloin rump pork. Landjaeger corned beef cupim short loin beef ribs, tail t-bone turkey fatback salami ribeye kielbasa turducken. Porchetta jerky chuck brisket, tongue boudin ham hamburger rump pork belly cupim pork short ribs beef ribs.</p><p>Flank ground round chuck pork loin fatback andouille boudin ball tip venison pig. Chuck fatback tri-tip brisket kielbasa tail. Chuck ham hock brisket turducken t-bone jowl. Tongue swine chicken kevin, pancetta alcatra pork loin pastrami shank venison capicola ground round. Jerky venison t-bone capicola fatback porchetta turducken strip steak. Pastrami shoulder rump, pork chop tenderloin turducken bacon landjaeger capicola meatloaf strip steak. Porchetta fatback alcatra sausage hamburger boudin venison frankfurter biltong andouille shoulder pork belly.</p>
            <small>tags: </small>
            <ul>
                <li ng-repeat="tag in model.tags track by $index" ng-click="$ctrl.selectTag(tag)">{{tag}}</li>
            </ul>
          </section>
        `,
      restrict: 'E',
      scope: {
        model: '=ngModel',
        reveal: '=',
        close: '&'
      },
      controllerAs: 'flkrUiDetailCtlr',
      controller: function ($scope) {
        var vm = this;
        vm.model = $scope.model;
      },
      link: function postLink(scope, element, attr, ctlr) {
        var elem = angular.element(element)[0];
        scope.$watch('reveal', function (newVal, oldVal) {
          if (newVal === oldVal) {
            TweenMax.set(elem, { css: {autoAlpha:0, top:60, scale: 1}, force3D:true, transformOrigin: 'center center' } );
            return;
          }
          if (newVal) {
            TweenMax.set(elem, { css: {scale: 1}, force3D:true, transformOrigin: 'center center' } );
            TweenMax.to(elem, 0.3, { css: {autoAlpha:1, top:0}, ease:'Sine.easeOut' } );
          } else {
            TweenMax.to(elem, 0.3, { css: { autoAlpha:0, top:60, scale: 0.6}, force3D:true, transformOrigin: 'center center', ease: 'Power2.easeOut'} );
          }
        });

        ctlr.selectTag = function (tag) {
          //TODO: refresh the social feed based on the tag parameter...
          $log.log(tag);
        };
      }
    };
  });