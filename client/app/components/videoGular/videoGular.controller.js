(function() {
 
  'use strict'; 

  angular 
    .module('app') 
    .controller('VideoGularCtrl', VideoGularCtrl);

  function VideoGularCtrl($rootScope, $scope, $state, Videos) {

    this.playerReady = function(api){
      $scope.api = api; 
    } 

    this.onUpdateState = function(state){
      if(state==='play'){
        if($rootScope.playingVideo && $rootScope.playingVideo != $scope.api) $rootScope.playingVideo.pause(); 
        $rootScope.playingVideo = $scope.api; 
      } 
    } 
  }

})();