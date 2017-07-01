(function() {
  'use strict'; 

  angular 
    .module('app') 
    .directive('videoGular', videoGular);

  function videoGular ($sce) {

    return {
      restrict: 'E', 
      templateUrl: 'app/components/videoGular/videoGular.html', 
      scope: {
        url: '=', 
        controls: "="
      }, 
      controller: 'VideoGularCtrl', 
      controllerAs: 'ctrl', 
      link: function (scope, element, attrs) {
        var updateConfig = function(){
          scope.config = {
            sources: [ {src: $sce.trustAsResourceUrl(scope.url), type: 'video/mp4'} ], 
            useNativeControls: true, 
            theme:'http://www.videogular.com/styles/themes/default/latest/videogular.css', 
            controls: scope.controls 
          } 
        } 

        scope.$watch('url', function (oldVal, newVal) {
          updateConfig(); 
        }); 
      } 
    } 
  }

})();