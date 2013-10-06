'use strict';

angular.module('formulateAdminApp')
.controller('ThemesCtrl', function ($scope, $routeParams, $log, $q, angularFire, Slug) {

    // add console.log
    var $log = $log.log;

    var url = "https://formulate.firebaseio.com/";
    var ref = new Firebase(url);

    var themesRef = ref.child('themes');

    var deferred = $q.defer();

    $scope.themes = {}

    var promise = deferred.promise;

    // add snapshots onload
    themesRef.on('value', function(snapshot) {
      if(snapshot.val() === null) {
        $log('There are no current themes!');
      } else {
        $log('snapshot is', snapshot.val());
        $scope.themes = snapshot.val();
        $scope.currentTheme = snapshot.val().aaa;
        $log($scope.currentTheme);
        $scope.$apply();
      }
    })

    promise.then(function() {
      $log('promise happened')
    })

    // themesRef.on('child_added', function(snapshot) {
    //   var currentTheme = snapshot.val();
    //   $log('current theme', currentTheme)
    //   $scope.currentTheme = currentTheme;
    // })

    // add Theme
    $scope.addTheme = function(obj) {
      window.console.log('updated themes', obj);

      obj.dateCreated = new Date();
      themesRef.child(obj.slug).set(obj);

      $scope.theme = "";

    }


    $scope.getCurrentTheme = function(slug) {
        var slug = $routeParams.slug;
        // window.console.log($routeParams.slug);
        $scope.currentTheme = themesRef.child('aaa');
        $log($scope.currentTheme);
    }


    // $scope.themes = []
    // var url = "https://formulate.firebaseio.com/themes/";
    // var ref = new Firebase(url);

    // angularFire(ref, $scope, 'themes').then(function(ref) {
    //     window.console.log('themes were just loaded');
    // });

    // $scope.pushAF = function(item) {
    //     $scope.themes.push(item, cb(ref));
    //     $scope.item = ''
    // }


    // // Add a new item by simply modifying the model directly.
    // // $scope.themes.push({name: "Firebase", desc: "is awesome!"});
    // // Or, attach a function to $scope that will let a directive in markup manipulate the model.
    // $scope.removeItem = function() {
    //   $scope.themes.splice($scope.toRemove, 1);
    //   $scope.toRemove = null;
    // };


    // var cb = function(ref) {
    //     window.console.log(ref);
    // }

    // $scope.optionalCallbackOnInitialLoad = function() {
    //   window.console.log($scope.themes['dave']);
    // }

    // $scope.cb = function(c) {
    //   window.console.log(c);
    // }


    // // $scope.currentTheme = $routeParams.slug

    // angularFire(ref.child('-J50neNBViK9l7P4QAYc'), $scope, "currentTheme", "")

    // $scope.themes[$routeParams.slug]


    // angularFire(ref.child('-J56hnYJNTVOnRSGHcsM'), $scope, "currentTheme", {});


  });
