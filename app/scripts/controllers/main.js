'use strict';

angular.module('formulateAdminApp')
  .controller('MainCtrl', function ($scope, $log, adminService, angularFire) {

    $log = $log.log;
    $scope.admin = [];


    adminService.getAdmin($scope, 'admin')
      .then(function() {
        $log('loaded admin');
        if ($scope.admin.length < 1) {
          setupAdmin();
        }
      });

    var setupAdmin = function() {
      var obj = adminService.setupAdmin();
      $scope.admin.push(obj);
      $scope.admin = $scope.admin[0];
    };

  });
