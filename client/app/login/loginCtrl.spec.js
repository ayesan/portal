describe('LoginCtrl', function() {

  beforeEach(angular.mock.module('app')); 

  var scope, createController, AuthService, $httpBackend, md5;

  beforeEach(inject(function ($rootScope, $controller, _$httpBackend_, _AuthService_, _md5_) {
    scope = $rootScope.$new(); 
    $httpBackend = _$httpBackend_;
    AuthService = _AuthService_;
    md5 = _md5_;
    createController = function() {
      return $controller('LoginCtrl', {
        $scope: scope 
      }); 
    };
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingRequest();
    $httpBackend.verifyNoOutstandingExpectation();
  });

  it('should be defined', function() {
    var controller = createController(); 
    expect(controller).toBeDefined(); 
  });

  it('should have a method submit', function() {
    var controller = createController(); 

    var user = {
      username: 'test', 
      password: md5.createHash('secret')
    } 
    $httpBackend.expectPOST('/user/auth', user).respond(200, {"status": "success"});

    controller.submit('test','secret');
    $httpBackend.flush();

  });

});