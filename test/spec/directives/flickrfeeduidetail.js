'use strict';

describe('Directive: flickrFeedUIDetail', function () {

  // load the directive's module
  beforeEach(module('flickYerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<flickr-feed-u-i-detail></flickr-feed-u-i-detail>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the flickrFeedUIDetail directive');
  }));
});
