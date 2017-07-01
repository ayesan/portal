angular
  .module('app')
  .config(routesConfig)
  .run(appRun);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('login', {
      url: '/', 
      templateUrl: 'app/login/index.html', 
      controller: 'LoginCtrl', 
      controllerAs: 'LoginCtrl', 
      data: {
        requireLogin: false 
      } 
    })
    .state('videos', {
      url: '/videos', 
      abstract: true, 
      templateUrl: 'app/videos/index.html', 
      controller: 'VideosCtrl', 
      controllerAs: 'VideosCtrl', 
      data: {
        requireLogin: true 
      }
    })
    .state('videos.home',{
      url: '/home', 
      title: 'Videos', 
      templateUrl: 'app/videos/home.html'
    })
    .state('videos.detail',{
      url: '/detail', 
      title: 'Video Details', 
      templateUrl: 'app/videos/detail.html'
    });

  $httpProvider.interceptors.push(function($q, $location) {
    return {
      'responseError': function(response) {
        if(response.status === 401 || response.status === 403) {
          $location.path('/'); 
        } 
        return $q.reject(response); 
      } 
    }; 
  });
}


function appRun($rootScope, $state, $cookies) {
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    var requireLogin = toState.data.requireLogin;
    if(requireLogin && typeof $cookies.get('currentUser') === 'undefined') {
      event.preventDefault(); 
      $state.go('login'); 
    } else if( toState.name === 'videos.detail' && typeof $rootScope.activeVideo === 'undefined' ) {
      event.preventDefault(); 
      $state.go('videos.home'); 
    } 
  }); 
}