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
      $log('it loaded')
    }, function(err) {
      $log('ERROR: Loading Themes: ' + err);
    });

    adminPromise.then(function(ref) {
      setupAdmin()
    }, function(err) {
      $log('ERROR: Loading Admin: ' + err);
    });

    var startWatch = function ($scope, filter) {

      $scope.$watch('themes', function() {
        $scope.themesList = $scope.themes;
      });

      // watch location path for changes
      $scope.$watch('location.path()', function(path) {
        if (path === '/themes/' + $stateParams.themeId + '/' + $stateParams.themeSlug) {
          getCurrentTheme($stateParams.themeId)
        };
      });

      $scope.addTheme = function() {
        if ($scope.theme.details.slug === '') {
          return;
        }

        // set and add current theme
        var obj = $scope.theme;
        obj.details.dateCreated = new Date();
        obj.details.version = '1.1';
        obj.details.favorites = 0;
        obj.id = setCurrentThemeId();
        $scope.themes.push(obj);

        // reset current theme
        $scope.theme = "";

        // take us to new theme
        $location.path('/themes/' + obj.id + '/' + obj.details.slug);

      };

      $scope.removeTheme = function (theme) {
        $scope.themes.splice($scope.themes.indexOf(theme), 1);
        $location.path('/themes/create/')
      };

      var getCurrentTheme = function(id) {
        id = id || $stateParams.themeId;
        $scope.theme = filter($scope.themes, {id: id});
        if ($scope.theme.length > 1) {
          $log('ERROR: there is more than 1 with the same ID!')
        }
        $scope.theme = $scope.theme[0];
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

    var setCurrentThemeId = function() {
      $scope.admin.themeIdCounter += 1;
      return $scope.admin.themeIdCounter;
    }


  });
