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
        url: '/:themeId/:themeSlug',
        templateUrl: 'views/theme.view.html',
        controller: 'ThemesCtrl'
      })
      .state('theme.edit', {
        url: '/:theme/edit',
        templateUrl: 'views/theme.edit.html',
        controller: 'ThemesCtrl'
      })
      .state('theme.create', {
        url: '/create',
        templateUrl: 'views/theme.create.html',
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
