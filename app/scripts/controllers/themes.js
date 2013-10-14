'use strict';

angular.module('formulateAdminApp')
.controller('ThemesCtrl', function ($scope, $stateParams, $log, $window, $location, angularFire, filterFilter, Slug, adminService, themeService) {

    // add console.log
    var $log = $log.log;
    var _ = window._;


    // reset values
    $scope.theme = '';
    $scope.editedTheme = null;
    $scope.themes = [];

    $scope.location = $location;


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

        var obj = themeService.addTheme($scope.vars, $scope.theme);

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


    var setCurrentThemeId = function() {
      $scope.admin.themeIdCounter += 1;
      return $scope.admin.themeIdCounter;
    };
  });
