(function() {

  'use strict'; 

  angular 
    .module('app') 
    .directive('pageTop', pageTop);

  function pageTop() {

    return {
      restrict: 'E', 
      controller: 'PageTopCtrl', 
      controllerAs: 'ctrl', 
      templateUrl: 'app/components/pageTop/pageTop.html'
    } 
  }

})();
