describe('RateItCtrl', function() {

  beforeEach(angular.mock.module('app')); 

  var scope, Videos, createController;

  beforeEach(inject(function ($rootScope, $controller, _Videos_) {
    scope = $rootScope.$new(); 
    Videos = _Videos_;
    createController = function() {
      return $controller('RateItCtrl', {
        $scope: scope 
      }); 
    };
  }));

  it('should be defined', function() {
    var controller = createController(); 
    expect(controller).toBeDefined(); 
  });


  it('should have a method rateCallback', function () {
    var controller = createController(); 
    controller.rateCallback(); 
  });

});