'use strict';

angular.module('formulateAdminApp')
  .filter('hyphenate', function () {
    return function (input) {
      if (input === undefined) {
        return;
      } else {
        input = input.split('');
        return input;
      }
    };
  });
