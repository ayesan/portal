(function() {
 
  'use strict'; 

  angular 
    .module('app') 
    .directive('backTop', backTop); 

  function backTop() {
    return {
      restrict: 'E', 
      templateUrl: 'app/components/backTop/backTop.html', 
      controller: function () {
        $('#backTop').backTop({
          'position': 200, 
          'speed': 100 
        }); 
      } 
    }; 
  }

})();