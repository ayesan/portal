(function() {

  'use strict';
  
  angular 
    .module('app') 
    .controller('VideosCtrl', VideosCtrl);
  
  VideosCtrl.$inject = ['$rootScope','$scope','$state','Videos'];
  
  function VideosCtrl($rootScope, $scope, $state, Videos) {

    $scope.showDetail = function(video){
      $rootScope.activeVideo = video; 
      Videos.setActive(video, function(resp){
        console.log(resp); // log response 
        $state.go('videos.detail'); 
      }); 
    } 

    init(); 

    function init() {
      $rootScope.activeVideo = {}; 
      $scope.videos = Videos; 
      console.log('Videos Ctrl'); 
    } 
  }
})();
