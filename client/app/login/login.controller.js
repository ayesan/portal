angular
  .module('app')
  .controller('LoginCtrl', LoginCtrl);

/** @ngInject */
function LoginCtrl($rootScope, $scope, $state, AuthService) {
  this.submit = function (username, password) {
    AuthService.login(username, password, function(resp){
      if(resp.status === 'success'){
        $state.go('videos.home');
      } else {
        $scope.errorMsg = resp.error;
      }
    }, function(error){
      console.log(error, ' Error Login');
    });
  };
}
