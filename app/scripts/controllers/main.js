'use strict';

angular.module('formulateAdminApp')
  .controller('MainCtrl', function ($scope, $log, adminService, docService,  angularFire) {

    // reset values
    $log = $log.log;
    $scope.docs = [];
    $scope.vars = [];
    $scope.admin = [];


    // Admin
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


    // Vars
    docService.getVars($scope, 'vars')
      .then(function() {
        if ($scope.vars.length < 1) {
          $scope.vars = docService.setupVars();
        } else {
          return;
        }
      })
      .then(function() {
        $log('loaded docs');
      });

  });
