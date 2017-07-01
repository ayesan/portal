describe('backTop Directive', function() {

  var compile, scope, directiveElem;

  beforeEach(function(){
  	angular.mock.module('app'); 
    
    inject(function($compile, $rootScope) {
      compile = $compile;
      scope = $rootScope.$new();
    });

    directiveElem = getCompiledElement();

  });

  function getCompiledElement(){
  	var element = angular.element('<back-top></back-top>');
  	var compiledElement = compile(element)(scope);

  	scope.$digest();
  	return compiledElement;
  }

  it('should have i element', function () {
  	var iElement = directiveElem.find('i'); 
  	expect(iElement).toBeDefined(); 
  	expect(iElement.hasClass('back-top')).toBe(true); 
  });

  it('should applied template', function () {
  	expect(directiveElem.html()).not.toEqual(''); 
  });

})