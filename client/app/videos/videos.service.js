(function() {

  'use strict'; 

  angular
    .module('app')
    .factory('Videos', videoService);

  function videoService($rootScope, $http, $cookies) {

    var Videos = {
      items: [],
      busy: false, 
      offset: 0, 
      limit: 10, 
      maxdata: false, 
      activeVideo: null, 
      nextPage: nextPage, 
      addRate: addRate, 
      setActive: setActive, 
      updateItem: updateItem 
    } 

    return Videos;

    function nextPage(){
      var _this = this;
      var sessionId = $cookies.get('currentUser'); 

      if(_this.busy || _this.maxdata) return; 
      _this.busy = true; 

      var url = '/videos?sessionId='+ sessionId +'&skip='+ _this.offset +'&limit='+ _this.limit; 
      $http.get(url).then(function(response){
        var items = response.data.data; 
        if(items.length < _this.limit){
          _this.maxdata = true; 
          _this.busy = false; 
          return; 
        } 
        for(var i = 0; i < items.length; i++){
          _this.items.push(items[i]); 
        } 
        _this.offset += 10; 
        _this.busy = false; 
      }, function(error){
        console.log(error, "Error fetch videos"); 
      }); 
    }

    function addRate(params, success, error){

      var _this = this; 
      var sessionId = $cookies.get('currentUser');
      var url = '/video/ratings?sessionId='+ sessionId; 
      $http.post(url, params).then(function(response){
        if(response.data.status === 'success'){
          success(response.data.data); 
          // update rating for activeVideo item 
          _this.updateItem(response.data.data); 
        } else 
          error(response.data); 
      }, function(error){
        console.log(error, "Error fetch videos"); 
        error(error); 
      }); 
    } 

    function setActive(video, callback){
      this.activeVideo = video; 

      if(callback){
        callback('Active Video successfully added'); 
      } 
    } 

    // private methods
    function updateItem(o){
      // find index of active video; 
      var f;
      var found = this.items.some( function(arr,i) { f = i; return arr._id === o._id }); 
      if (!found) { return false; }
      this.items[f].ratings = o.ratings; 
    } 
  }
})();