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

    var getCurrentTheme = function(slug) {

      var slugParam = slug || $stateParams.theme;

      // get current theme by slug
      $scope.currentTheme = _.find($scope.themes, {slug: slugParam} );

      // binding theme to current theme for editing
      $scope.theme = $scope.currentTheme;
    };


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

      // get theme obj from slug
      getCurrentTheme(obj.slug);

      // send user to new path after complete
      $location.path('/themes/' + obj.slug);

    };

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
      // newThemes = snapshot.val();

      if ($stateParams.theme) {

        getCurrentTheme();

      };


    });


  });
