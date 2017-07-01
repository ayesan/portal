(function() {
  
  'use strict'; 

  angular 
    .module('app') 
    .factory('AuthService', AuthService); 

  function AuthService($rootScope, $cookies, $http, md5) {

    var auth = {
      isLoggedIn: isLoggedIn, 
      login: login, 
      logout: logout, 
      setCredentials: setCredentials, 
      clearCredentials: clearCredentials 
    }; 

    return auth; 

    function isLoggedIn(user){
      if(user === undefined) 
        user = $roootScope.currentUser; 
      return user 
    } 

    function login(username, password, success, error){

      var user = {
        username: username, 
        password: md5.createHash(password || '')
      } 

      $http.post('/user/auth', user ).then(function(response){
        if(response.status === 200){
          setCredentials(response.data); 
          success(response.data); 
        } else {
          error(response); 
        } 
      }, function(err){
        error(err); 
      }); 
    } 

    function logout(success, error){

      var sessionId = $cookies.get('currentUser'); 
 
      return $http.get('/user/logout?sessionId='+sessionId).then(function(response){
        success(response.data);
        clearCredentials(); 
      }, function(err){
        error(err); 
      }); 
    }

    function setCredentials(response){

      $rootScope.currentUser = response; 
      $cookies.remove('currentUser'); // clear cookie currentUser 

      var cookieExp = new Date(); 
      cookieExp.setDate(cookieExp.getDate() + 7); 
      $cookies.put('currentUser',$rootScope.currentUser.sessionId, { expires: cookieExp }); 
    } 

    function clearCredentials() {

      $rootScope.currentUser = {}; 
      $cookies.remove('currentUser'); 
    } 
  }
  
})();