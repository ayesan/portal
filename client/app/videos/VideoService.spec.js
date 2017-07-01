describe('Video service', function () {
  var Videos,
    $httpBackend,
    $cookies,
    successCallback,
    errorCallback;

  var mockData = {"status":"success","data":[{"_id":"5757e6e41b0a244b256ac1d5","name":"[1] Google Cardboard", "ratings": [1,2,3] }]}
  var mockAddRateData = {"status":"success","data":{"_id":"5757e6e41b0a244b256ac1d5","name":"[1] Google Cardboard", "ratings": [1,2,3]}}

  beforeEach(angular.mock.module('app')); 

  beforeEach(inject(function (_$httpBackend_,_$cookies_, _Videos_) {
    $httpBackend = _$httpBackend_;
    $cookies = _$cookies_;
    Videos = _Videos_;
    successCallback = jasmine.createSpy();
    errorCallback = jasmine.createSpy();
  }));
  
  afterEach(function() {
    $httpBackend.verifyNoOutstandingRequest();
    $httpBackend.verifyNoOutstandingExpectation();
  });


  it('should have nextPage method', function () {
    
    var sessionId = $cookies.get('currentUser');
    var url = '/videos?sessionId='+sessionId+'&skip='+Videos.offset+'&limit='+Videos.limit;
    
    $httpBackend.expectGET(url).respond(200, mockData);

    Videos.nextPage();
    $httpBackend.flush();
  });

  it('should have addRate method', function () {
    
    var sessionId = $cookies.get('currentUser');
    var url = '/video/ratings?sessionId='+ sessionId; 
    var params = {"videoId":"5757e6e41b0a244b256ac1d5","rating":"5"};

    Videos.items = mockData.data; // video mock data;

    $httpBackend.expectPOST(url,params).respond(200, mockAddRateData);

    Videos.addRate(params,successCallback,errorCallback);
    $httpBackend.flush();
  });

});