'use strict';

angular.module('formulateAdminApp')
  .filter('hyphenate', function () {
    return function (input) {
      input = input.split('');

      return input
    };
  });
