describe('AuthService service', function () {
  var AuthService,
    $httpBackend,
    $cookies,
    successCallback,
    errorCallback,
    md5;

  beforeEach(angular.mock.module('app')); 

  beforeEach(inject(function (_$httpBackend_,_$cookies_, _AuthService_, _md5_) {
    $httpBackend = _$httpBackend_;
    $cookies = _$cookies_;
    AuthService = _AuthService_;
    md5 = _md5_;
    successCallback = jasmine.createSpy();
    errorCallback = jasmine.createSpy();
  }));
  
  afterEach(function() {
    $httpBackend.verifyNoOutstandingRequest();
    $httpBackend.verifyNoOutstandingExpectation();
  });


  it('should have a login method', function () {
    var user = {
      username: 'test', 
      password: md5.createHash('secret')
    } 
    $httpBackend.expectPOST('/user/auth', user).respond(200, {"status": "success"});

    AuthService.login( 'test', 'secret', successCallback,errorCallback);
    $httpBackend.flush();
  });

  it('should have a logout method', function () {
    
    var sessionId = $cookies.get('currentUser'); 
    $httpBackend.whenGET('/user/logout?sessionId='+sessionId).respond(200, {});

    AuthService.logout(successCallback,errorCallback);
    $httpBackend.flush();
  });
});