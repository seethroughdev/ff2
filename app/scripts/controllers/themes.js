'use strict';

angular.module('formulateAdminApp')
.controller('ThemesCtrl', function ($scope, $stateParams, $log, $window, $location, angularFire, filterFilter, Slug, docService, adminService, themeService) {

    // add console.log
    var $log = $log.log;
    var _ = window._;

    // firebase setup
    var url = "https://formulate.firebaseio.com/",
        ref = new Firebase(url),
        // refThemes = ref.child('themes'),
        refAdmin = ref.child('admin');

    // var themesPromise = angularFire(refThemes, $scope, 'themes');
    // var adminPromise = angularFire(refAdmin, $scope, 'admin');

    // reset values
    $scope.theme = '';
    $scope.editedTheme = null;
    $scope.themes = [];
    $scope.admin = [];

    $scope.location = $location;

    docService.getVars($scope, 'vars')
      .then(function() {
      $log('loaded docs');
      });

    adminService.setAdmin($scope, 'admin')
      .then(function(ref) {
        $log('loaded admin');
        if ($scope.admin.length < 1) {
          setupAdmin();
        }
      });

    themeService.getThemes($scope, 'themes')
      .then(function(ref) {
        startWatch($scope, filterFilter);
        $log('loaded themes');
      }, function(err) {
       $log('ERROR: Loading Themes: ' + err);
    });

    var startWatch = function ($scope, filter) {

      // set URL's for use in functions
      var urlTheme = '/themes/' + $stateParams.themeId + '/' + $stateParams.themeSlug;
      var urlEditTheme = urlTheme + '/edit';

      $scope.$watch('themes', function() {
        $scope.themesList = $scope.themes;
      });

      // watch location path for changes
      $scope.$watch('location.path()', function(path) {
        // assign value if view
        if (path === urlTheme) {
          getCurrentTheme($stateParams.themeId);
        }

        // assign value if edit
        if (path === urlEditTheme) {
          getCurrentTheme($stateParams.themeId);
        }
      });

      $scope.addTheme = function() {
        if ($scope.theme.detail.slug === '') {
          return;
        }

        // using object to avoid iterating over scope
        var vars = $scope.vars;
        var obj = $scope.theme;

        // set theme defaults if empty
        angular.forEach(vars, function(value, key) {
          if (obj[key] === undefined) {
            obj[key] = {};
          }
          angular.forEach(value, function(v, k) {
            if (obj[key][k] === undefined || obj[key][k] === '') {
              obj[key][k] = v.default;
            }
          });
        });

        obj.detail.dateCreated = new Date();
        obj.detail.version = '1.1';
        obj.detail.favorites = 0;
        obj.id = setCurrentThemeId();
        $scope.themes.push(obj);

        // reset current theme
        $scope.theme = '';

        // take us to new theme
        $location.path('/themes/' + obj.id + '/' + obj.detail.slug);

      };

      $scope.updateTheme = function(theme) {
        $scope.theme = theme;
        $location.path(urlTheme);
      };

      $scope.removeTheme = function (theme) {
        $scope.themes.splice($scope.themes.indexOf(theme), 1);
        $location.path('/themes/create/');
      };

      var getCurrentTheme = function(id) {
        id = id || $stateParams.themeId;
        $scope.theme = filter($scope.themes, {id: id});
        if ($scope.theme.length > 1) {
          $log('ERROR: there is more than 1 with the same ID!');
        }
        $scope.theme = $scope.theme[0];
      };

    };

    var setupAdmin = function() {
      var defaultAdmin = {
        'themeIdCounter': 101,
        'url': 'http://formulatecss.com'
      };

      $scope.admin.push(defaultAdmin);
      $scope.admin = $scope.admin[0];
    };

    var setCurrentThemeId = function() {
      $scope.admin.themeIdCounter += 1;
      return $scope.admin.themeIdCounter;
    };
  });
