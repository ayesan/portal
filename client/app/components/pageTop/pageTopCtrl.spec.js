describe('PageTopCtrl', function() {

  beforeEach(angular.mock.module('app')); 

  var state, location, AuthService, createController;

  beforeEach(inject(function ($state, $controller, $location, _AuthService_) {
    state = $state; 
    location = location;
    AuthService = _AuthService_;
    createController = function() {
        return $controller('PageTopCtrl'); 
    }; 
  }));

    it('should be defined', function() {
        var controller = createController();
        expect(controller).toBeDefined();
    });


    it('should have a method to logout', function () {
        var controller = createController();
        controller.logout();
    });
});