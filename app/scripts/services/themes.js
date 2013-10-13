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
      }

    }

    // Public API here
    return themesObj;
  });
