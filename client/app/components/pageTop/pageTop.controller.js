(function() {

  'use strict';

  angular 
    .module('app') 
    .controller('PageTopCtrl', PageTopCtrl);

  function PageTopCtrl ($state, AuthService) {

    this.logout = function () {
      AuthService.logout(function(resp){
        if(resp.status === 'success'){
            $state.go('login'); 
        } 
      }, function(error){
        console.log(error, 'Error logout'); 
      }) 
    } 
  }

})();