'use strict';

angular.module('formulateAdminApp')
.controller('ThemesCtrl', function ($scope, $routeParams, $log, $location, angularFire, Slug) {

    // add console.log
    var $log = $log.log;
    var _ = window._;

    // firebase setup
    var url = "https://formulate.firebaseio.com/";
    var ref = new Firebase(url);
    var themesRef = ref.child('themes');

    // initializing themes obj
    $scope.themes = [];
    $scope.currentTheme = {};

    // syncing themes with Firebase
    angularFire(themesRef, $scope, 'themes', {})
      .then(function() {
        $log('Themes loaded');
      }).then(function() {
        // set current theme if there is one
        if ($routeParams.slug) {
          getCurrentTheme();
        };
      });


    var getCurrentTheme = function() {
      var slugParam = $routeParams.slug;

      $scope.currentTheme = _.find($scope.themes, function(obj) {
        return obj.slug === slugParam;
      });
    }


    // add Theme Function
    $scope.addTheme = function(obj) {

      // add default date to obj
      obj.dateCreated = new Date();
      obj.version = '1.1';

      // add obj
      $scope.themes.push(obj);
      // themesRef.child(obj.slug).set(obj);

      // reset theme
      $scope.theme = "";
    }

    $scope.removeTheme = function(obj) {
      $scope.toRemove = $scope.themes.indexOf(obj);
      $scope.themes.splice($scope.toRemove, 1);
      $location.path('/')
    }


  });
