'use strict';

angular.module('formulateAdminApp')
  .factory('themeService', function (angularFire) {
    // Service logic
    // ...

    // firebase setup
    var url = "https://formulate.firebaseio.com/",
        ref = new Firebase(url),
        refThemes = ref.child('themes');


    var themesObj = {
      getThemes: function(scope, localScopeName) {
        return angularFire(refThemes, scope, localScopeName)
      },
      addTheme: function(vars, theme) {
        var docVars = vars,
            obj     = theme;

        // set theme defaults if empty
        angular.forEach(docVars, function(value, key) {
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

        return obj;
      }

    }

    // Public API here
    return themesObj;
  });
