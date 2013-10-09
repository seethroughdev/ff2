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


    var getCurrentTheme = function(slug) {

      var slugParam = slug || $stateParams.theme;

      var index = _.findIndex($scope.themes, {slug: slugParam} );

      $scope.currentTheme = $scope.themes[index];

      $log($scope.currentTheme.slug)

      // // binding theme to current theme for editing
      $scope.theme = $scope.currentTheme;

      // $location.path('/themes/' + slugParam)
    }


    // add Theme Function
    $scope.addTheme = function() {

      var obj = $scope.theme;

      // add default date to obj
      obj.dateCreated = new Date();
      obj.version = '1.1';

      // add obj
      $scope.themes.add(obj);

      // reset theme
      $scope.theme = "";

      getCurrentTheme(obj.slug);

    }

    $scope.removeTheme = function(obj) {
      $scope.themes.remove($scope.theme);
      $location.path('/themes/create/')
    }

    $scope.updateTheme = function() {
      $scope.themes.update($scope.theme);
      $location.path('/themes/' + $scope.theme.slug)
    }

     // syncing themes with Firebase
    $scope.themes = angularFireCollection(themesRef, function(snapshot) {
      $log('snapshot', snapshot.val());

      if ($stateParams.theme) {

        getCurrentTheme();

      };


    });


  });
