(function() {

  'use strict'; 

  angular 
    .module('app') 
    .directive('rateIt', rateIt); 


  function rateIt() {
    return {
      restrict: 'E', 
      templateUrl: 'app/components/rateIt/rateIt.html', 
      scope: {
        ratings: '=', 
        isReadOnly: '=',
      }, 
      controller: 'RateItCtrl', 
      controllerAs: 'ctrl', 
      link: function (scope, element, attrs) {

        var updateStars = function () {
          scope.aveRate = 0; 
          if(scope.ratings){
            var sum = scope.ratings.reduce( function(total,num){ return total + num}); 
            scope.rateLen = scope.ratings.length; 
            scope.aveRate = sum / scope.rateLen; 
          } 
        } 

        scope.$watch('ratings', function (oldVal, newVal) {
          updateStars(); 
        }); 
      } 
    } 
  }

})();