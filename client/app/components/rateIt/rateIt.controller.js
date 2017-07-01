(function() {
    'use strict';

    angular
      .module('app')
      .controller('RateItCtrl', RateItCtrl);

    function RateItCtrl($rootScope, $scope, Videos) {

      this.rateCallback = function(){
        if(Videos.activeVideo){
          var params = {
            videoId: Videos.activeVideo._id,
            rating: parseInt($scope.aveRate)
          }
          Videos.addRate(params, function(resp){
            console.log(resp); // log response
            $rootScope.activeVideo = resp; // update ratings
          }, function(error){
            alert('Error adding rate');
          })
        }
      }
    }

})();