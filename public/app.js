var app = angular.module('app', [])

app.controller('poemController', function($scope, $http) {
  $scope.load = function() {
  // set headers
  $http.defaults.headers.common['X-Mashape-Key'] = "EtTWWeqTGPmshQS4DrsWSju5uSdTp1GVq82jsnjZdH1sIWBdxM"
  
  // request poem-list array from API
  $http.get('https://pafmon-walt-whitman-poems.p.mashape.com/poems/').
    success(function(data, status, headers, config) {
      // poem list array
      var list = data

      // filtering out broken 'book' poems from the poem list array
      var listFilter = function(str) { return str.indexOf("book") == -1 }
      list = _.filter(list, listFilter)

      // get a random poem id from the array
      var index = Math.ceil(Math.random() * list.length)
      var id = list[index]

      // inner-request for the above poem id
      $http.get('https://pafmon-walt-whitman-poems.p.mashape.com/poems/' + id).
        success(function(data, status, headers, config) {
          $scope.title = data.title
          $scope.poem = data.text
        }). // error with inner-request for a specific poem
        error(function(data, status, headers, config) {
          console.log("error")
        });
    }). // error with poem-list request
    error(function(data, status, headers, config) {
      console.log("error")
    });
  }

  $scope.load()
})