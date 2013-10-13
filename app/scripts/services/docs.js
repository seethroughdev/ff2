'use strict';

angular.module('formulateAdminApp')
  .factory('docService', function (angularFire) {
    // Service logic
    // ...

    // firebase setup
    var url = 'https://formulate.firebaseio.com/',
        ref = new Firebase(url),
        refDocs = ref.child('docs'),
        refVars = refDocs.child('vars');


    // Public API here
    return {
      getVars: function(scope, localScopeName) {
        return angularFire(refVars, scope, localScopeName);
      }
    };
  });
