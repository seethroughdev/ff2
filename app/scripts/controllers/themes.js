'use strict';

angular.module('formulateAdminApp')
.controller('ThemesCtrl', function ($scope, $stateParams, $log, $location, angularFireCollection, Slug) {

    // add console.log
    var $log = $log.log;
    var _ = window._;

    // firebase setup
    var url = "https://formulate.firebaseio.com/";
    var ref = new Firebase(url);
    var themesRef = ref.child('themes');

    // initializing themes obj
    // $scope.themes = [];
    // $scope.currentTheme = {};


    var getCurrentTheme = function() {
      var slugParam = $stateParams.theme;

      $scope.currentTheme = _.find($scope.themes, function(obj) {
        return obj.slug === slugParam;
      });

      // binding theme to current theme for editing
      $scope.theme = $scope.currentTheme;
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
      $scope.themes.add($scope.theme);
      // themesRef.child(obj.slug).set(obj);

      // reset theme
      $scope.theme = "";
    }

    $scope.removeTheme = function(obj) {
      $scope.themes.remove($scope.theme);
      $location.path('/themes/new')
    }

    $scope.updateTheme = function() {
      $scope.themes.update($scope.theme);
      $location.path('/themes/view/' + $scope.theme.slug)
    }

     // syncing themes with Firebase
    $scope.themes = angularFireCollection(themesRef, function(snapshot) {
      $log('snapshot', snapshot.val());

      if ($stateParams.theme) {
        getCurrentTheme();
      };


    });


  });
