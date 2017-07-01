describe('rateIt Directive', function() {

  var compile, scope, directiveElem;

  beforeEach(function(){
  	angular.mock.module('app'); 
    
    inject(function($compile, $rootScope) {
      compile = $compile;
      scope = $rootScope.$new();
      scope.ratings = 'num';
      scope.isReadOnly = true;
    });

    directiveElem = getCompiledElement();

  });

  function getCompiledElement(){
  	var element = angular.element('<rate-it is-read-only="true" ratings="num"></rate-it> ');
  	var compiledElement = compile(element)(scope);

  	scope.$digest();
  	return compiledElement;
  }

  it('should have div element', function () {
  	var divElement = directiveElem.find('div'); 
  	expect(divElement).toBeDefined(); 
  	expect(divElement.hasClass('video-rating')).toBe(true); 
  });

  it('should applied template', function () {
  	expect(directiveElem.html()).not.toEqual(''); 
  });

  it('ratings on isolated scope should be two-way bound', function(){
    var isolatedScope = directiveElem.isolateScope();
    isolatedScope.ratings = "num";
    isolatedScope.isReadOnly = true; 
    expect(scope.ratings).toEqual('num');
    expect(scope.isReadOnly).toEqual(true); 
  });

})