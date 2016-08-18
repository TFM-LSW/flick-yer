'use strict';
var httpBackend;

describe('Service: flickrFeedService', function () {

  // load the service's module
  beforeEach(module('flickYerApp'));

  // instantiate service
  var flickrFeedService;
  beforeEach(inject(function (_flickrFeedService_) {
    flickrFeedService = _flickrFeedService_;
  }));

  beforeEach(inject(function($injector) {
    httpBackend = $injector.get('$httpBackend');
  }));

  it('should do something', function () {
    expect(!!flickrFeedService).toBe(true);
  });


  it('should load the flickr feed', inject(function() {
    var flickrAPI = 'https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=JSON_CALLBACK&tags=potato&tagmode=all&format=json';
    httpBackend.expectJSONP(flickrAPI).respond({
        description: '',
        generator: 'https://www.flickr.com/',
        items: [''],
        link: 'https://www.flickr.com/photos/tags/patato/',
        modified: '2016-07-03T18:04:39Z',
        title: 'Recent Uploads tagged patato'
      });
    flickrFeedService.getFeed('potato');
    httpBackend.flush();
    expect(flickrFeedService.feedData).toEqual(jasmine.any(Object));
    expect(flickrFeedService.feedData.generator).toEqual('https://www.flickr.com/');
    expect(flickrFeedService.feedData.items).toEqual(jasmine.any(Array));
  }));

});
