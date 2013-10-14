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
      getAdmin: function(scope, localScopeName) {
        return angularFire(refAdmin, scope, localScopeName);
      },
      setupAdmin: function() {
        var defaultAdmin = {
          'themeIdCounter': 101,
          'url': 'http://formulatecss.com',
          'docsUrl': 'http://formulatecss.com/#/docs/vars'
        };
        return defaultAdmin;
      }
    };

    // Public API here
    return adminObj;
  });
