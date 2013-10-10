'use strict';

angular.module('formulateAdminApp')
.controller('ThemesCtrl', function ($scope, $stateParams, $log, $location, angularFireCollection, Slug) {

    // add console.log
    var $log = $log.log;
    var _ = window._;

    // firebase setup
    var url = "https://formulate.firebaseio.com/",
        ref = new Firebase(url),
        refThemes = ref.child('themes'),
        refAdmin = ref.child('admin');

    var init = function() {
      // syncing themes with Firebase
      $scope.themes = angularFireCollection(refThemes, function(snapshot) {
        // newThemes = snapshot.val();
        // if on a theme page, load current theme
        if ($stateParams.theme) {
          getCurrentTheme();
        }
      });

      $scope.admin = angularFireCollection(refAdmin, function(snapshot) {
        // set ID to 0 if its null
        if (!snapshot.val() || snapshot.val() === "undefined") {
          $log('there is nothing')
          refAdmin.set({'currentThemeId': 0})
        }
          $log('is', $scope.admin)



      });
    };


    var setThemeId = function() {
    };

    var getCurrentTheme = function(slug) {

      var slugParam = slug || $stateParams.theme;

      // get current theme by slug
      $scope.currentTheme = _.find($scope.themes, {slug: slugParam} );

      // binding theme to current theme for editing
      $scope.theme = $scope.currentTheme;
    };


    $scope.addTheme = function() {
      // set up object
      var obj = $scope.theme;
      obj.dateCreated = new Date();
      obj.version = '1.1';
      obj.id = setThemeId();
      $scope.themes.add(obj);

      // set theme obj from slug
      getCurrentTheme(obj.slug);

      // reset theme fields
      $scope.theme = "";
    };

    $scope.removeTheme = function(obj) {
      $scope.themes.remove($scope.theme);
      $location.path('/themes/create/')
    };

    $scope.updateTheme = function() {
      $scope.themes.update($scope.theme);
      $location.path('/themes/' + $scope.theme.slug)
    };


    init();

  });
