'use strict';

angular.module('formulateAdminApp')
.controller('ThemesCtrl', function ($scope, $stateParams, $log, $location, angularFire, filterFilter, Slug) {

    // add console.log
    var $log = $log.log;
    var _ = window._;

    // firebase setup
    var url = "https://formulate.firebaseio.com/",
        ref = new Firebase(url),
        refThemes = ref.child('themes'),
        refAdmin = ref.child('admin');

    var promise = angularFire(refThemes, $scope, 'themes');

    $scope.theme = '';
    $scope.editedTheme = null;
    $scope.themes = [];

    $scope.location = $location;

    // start watching
    promise.then(function(themes) {
      startWatch($scope, filterFilter)
    });

    var startWatch = function ($scope, filter) {
      // $scope.$watch('themes', function() {

      // }, true);

      // $scope.$watch('location.path()', function(path) {

      // });

      $scope.addTheme = function() {
        if ($scope.theme.details.slug === '') {
          return;
        }

        var obj = $scope.theme;
        obj.dateCreated = new Date();
        obj.version = '1.1';
        // obj.id = setThemeId();

        $scope.themes.push(obj);

        $scope.theme = "";

      }


    }


  });
