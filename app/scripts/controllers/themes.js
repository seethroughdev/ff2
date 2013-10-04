'use strict';

angular.module('formulateAdminApp')
  .controller('ThemesCtrl', function ($scope, $routeParams, angularFireCollection, angularFire, Slug) {

    var url = "https://formulate.firebaseio.com/themes/";
    var ref = new Firebase(url);

    $scope.items = angularFireCollection(ref);

    $scope.optionalCallbackOnInitialLoad = function() {
      window.console.log($scope.items['dave']);
    }

    $scope.cb = function(c) {
      window.console.log(c);
    }


    // $scope.currentTheme = $routeParams.slug

    angularFire(ref.child('-J50neNBViK9l7P4QAYc'), $scope, "currentTheme", "")

    // $scope.items[$routeParams.slug]


    // angularFire(new Firebase(url + '-J50zaup_mTRCB71Bhsf'), $scope, "currentTheme", "");


  });
