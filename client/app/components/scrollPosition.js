(function() {
  
  'use strict'; 

  angular 
    .module('app') 
    .directive('scrollPosition', scrollPosition);

  function scrollPosition() {

    return {
      scope: {
        scrollPosition: '=', 
        maxHeight: '='
      }, 
      link: function (scope) {
        $(window).on('scroll', function() {
          var scrollTop = $(window).scrollTop() > scope.maxHeight; 
          if (scrollTop !== scope.prevScrollTop) {
            scope.$apply(function() {
              scope.scrollPosition = scrollTop; 
            }); 
          } 
          scope.prevScrollTop = scrollTop; 
        }); 
      } 
    }; 
  }

})();