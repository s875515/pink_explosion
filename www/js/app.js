// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'angular-table'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


.controller("basicExampleCtrl", ["$scope", "$filter", "$http", function($scope, $filter, $http) {
  // $scope.list = $scope.$parent.personList

  $scope.list = [];

  $http({
    // url: 'https://cdn.rawgit.com/tony1223/098e45623c73274f7ae3/raw/2038e428306da26e0e08459bec3142b10da4e56d/gistfile1.json',
    // url: 'http://data.taipei/opendata/datalist/apiAccess?scope=resourceAquire&rid=8ee36437-1255-47b3-bfda-5dffe71ffdc0',
    url: 'lib/1040630apiAccess.json',
    // url: 'https://cdn.rawgit.com/tony1223/098e45623c73274f7ae3/raw/95062359e3c20fd32fc1868b8a45dd1e60e84cf1/gistfile1.json',
    method: 'get'
  }).success(function(data, status, headers, config) {
    $scope.data = data;
    for (var i in data.data) {
      $scope.list.push({
        id: data.data[i].編號,
        counties: data.data[i].縣市別,
        admitted: data.data[i].收治單位,
        number: data.data[i].檢傷編號,
        name: data.data[i].姓名,
        gender: data.data[i].性別,
        country: data.data[i].國籍,
        age: data.data[i].年齡,
        medicaltriage: data.data[i].醫療檢傷,
        ambulancetriage: data.data[i].救護檢傷,
        instanttrend: data.data[i].即時動向,
        referral: data.data[i].轉診要求,
        deleteindex: data.data[i].刪除註記
      });
    };
    $scope.originalList = $scope.list;
  });

  $scope.config = {
    maxPages: 5,
    itemsPerPage: 20,
    fillLastPage: true
  }

  $scope.updateFilteredList = function(query) {
    $scope.list = $filter("filter")($scope.originalList, query);
  };

}]);