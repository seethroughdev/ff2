'use strict';

angular.module('formulateAdminApp')
  .factory('adminService', function (angularFire) {
    // Service logic
    // ...

    // firebase setup
    var url = "https://formulate.firebaseio.com/",
        ref = new Firebase(url),
        refAdmin = ref.child('admin');


    var adminObj = {
      setAdmin: function(scope, localScopeName) {
        return angularFire(refAdmin, scope, localScopeName);
      }
    };

    // Public API here
    return adminObj;
  });
