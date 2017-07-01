describe('pageTop Directive', function() {

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
  	var element = angular.element('<page-top></page-top>');
  	var compiledElement = compile(element)(scope);

  	scope.$digest();
  	return compiledElement;
  }

  it('should have div element', function () {
  	var divElement = directiveElem.find('div'); 
  	expect(divElement).toBeDefined(); 
  	expect(divElement.hasClass('page-top')).toBe(true); 
  });

  it('should applied template', function () {
  	expect(directiveElem.html()).not.toEqual(''); 
  });

})