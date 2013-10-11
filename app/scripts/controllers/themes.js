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

    var themesPromise = angularFire(refThemes, $scope, 'themes');
    var adminPromise = angularFire(refAdmin, $scope, 'admin');

    $scope.theme = '';
    $scope.editedTheme = null;
    $scope.themes = [];
    $scope.admin = [];

    $scope.location = $location;

    // start watching
    themesPromise.then(function(ref) {
      startWatch($scope, filterFilter)
    });

    adminPromise.then(function(ref) {
      setupAdmin()
    })

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
        obj.details.dateCreated = new Date();
        obj.details.version = '1.1';
        obj.id = getCurrentThemeId();
        // obj.id = setThemeId();

        $scope.themes.push(obj);

        $scope.theme = "";

      };
    };


    var setupAdmin = function() {
      var defaultAdmin = {
        'themeIdCounter': 101,
        'url': 'http://formulatecss.com'
      };

      if ($scope.admin.length < 1) {
        $scope.admin.push(defaultAdmin);
        $scope.admin = $scope.admin[0];
      }
    };

    var getCurrentThemeId = function() {
      $scope.admin.themeIdCounter += 1;
      return $scope.admin.themeIdCounter;
    }



  });
