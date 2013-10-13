'use strict';

angular.module('formulateAdminApp', ['firebase', 'ui.router', 'slugifier'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/index.html'
      })
      .state('theme', {
        abstract: true,
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
        url: '/:themeId/:themeSlug/edit',
        templateUrl: 'views/theme.edit.html',
        controller: 'ThemesCtrl'
      })
      .state('theme.create', {
        url: '/create',
        templateUrl: 'views/theme.create.html',
        controller: 'ThemesCtrl'
      })
      .state('theme.list', {
        url: '/browse',
        templateUrl: 'views/theme.list.html',
        controller: 'ThemesCtrl'
      })
      .state('docs', {
        url: '/docs',
        templateUrl: 'views/docs.html',
        controller: 'DocsCtrl'
      })
      .state('docs.vars', {
        url: '/vars',
        templateUrl: 'views/docs.vars.html',
        controller: 'DocsCtrl'
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
