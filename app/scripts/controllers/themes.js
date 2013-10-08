'use strict';

angular.module('formulateAdminApp')
.controller('ThemesCtrl', function ($scope, $stateParams, $log, $location, angularFire, Slug) {

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
        if ($stateParams.theme) {
          $log('detected slug', $stateParams.theme)
          getCurrentTheme();
        };
      });


    var getCurrentTheme = function() {
      var slugParam = $stateParams.theme;

      $scope.currentTheme = _.find($scope.themes, function(obj) {
        return obj.slug === slugParam;
      });
    }


    // add Theme Function
    $scope.addTheme = function() {

      $log($scope.theme)

      var obj = $scope.theme;

      $log(obj)

      // add default date to obj
      $scope.theme.dateCreated = new Date();
      $scope.theme.version = '1.1';

      // add obj
      $scope.themes.push($scope.theme);
      // themesRef.child(obj.slug).set(obj);

      // reset theme
      $scope.theme = "";
    }

    $scope.removeTheme = function(obj) {
      $scope.toRemove = $scope.themes.indexOf(obj);
      $scope.themes.splice($scope.toRemove, 1);
      $location.path('/themes/new')
    }


  });
