'use strict';

angular.module('formulateAdminApp', ['firebase', 'ui.router', 'slugifier'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/index.html'
      })
      .state('theme', {
        url: '/themes',
        templateUrl: 'views/themes.html',
        controller: 'ThemesCtrl'
      })
      .state('theme.view', {
        url: '/view/:theme',
        templateUrl: 'views/theme.view.html',
        controller: 'ThemesCtrl'
      })
      .state('theme.edit', {
        url: '/edit/:theme',
        templateUrl: 'views/theme.edit.html',
        controller: 'ThemesCtrl'
      })
      .state('theme.new', {
        url: '/new',
        templateUrl: 'views/theme.new.html',
        controller: 'ThemesCtrl'
      })

      // .when('/', {
      //   templateUrl: 'views/themes.html',
      //   controller: 'ThemesCtrl'
      // })
      // .when('/themes/:slug/', {
      //   templateUrl: 'views/theme.html',
      //   controller: 'ThemesCtrl'
      // })
      // .otherwise({
      //   redirectTo: '/'
      // });
  });
