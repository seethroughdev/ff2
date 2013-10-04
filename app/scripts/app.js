'use strict';

angular.module('formulateAdminApp', ['firebase', 'slugifier'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/themes.html',
        controller: 'ThemesCtrl'
      })
      .when('/themes/:slug/', {
        templateUrl: 'views/theme.html',
        controller: 'ThemesCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
