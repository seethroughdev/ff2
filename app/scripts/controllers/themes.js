'use strict';

angular.module('formulateAdminApp')
.controller('ThemesCtrl', function ($scope, $routeParams, $log, $q, angularFire, Slug) {

    // add console.log
    var $log = $log.log;

    // firebase setup
    var url = "https://formulate.firebaseio.com/";
    var ref = new Firebase(url);
    var themesRef = ref.child('themes');

    // initializing themes obj
    $scope.themes = []

    // syncing themes with Firebase
    angularFire(themesRef, $scope, 'themes')
      .then(function(ref) {

        $log('Themes loaded');

      }).then(function() {

        // pass current theme if there is one
        if ($routeParams.slug) {
          var slug = $routeParams.slug;
          angularFire(themesRef.child(slug), $scope, 'currentTheme');
        };
      })




    // var getCurrentTheme = function(slug) {
    //   $scope.currentTheme =
    // }

    // // add snapshots onload
    // themesRef.on('value', function(snapshot) {
    //   if(snapshot.val() === null) {
    //     $log('There are no current themes!');
    //   } else {
    //     $log('snapshot is', snapshot.val());
    //     $scope.themes = snapshot.val();
    //     $scope.currentTheme = snapshot.val().aaa;
    //     $log($scope.currentTheme);
    //     $scope.$apply();
    //   }
    // })


    // themesRef.on('child_added', function(snapshot) {
    //   var currentTheme = snapshot.val();
    //   $log('current theme', currentTheme)
    //   $scope.currentTheme = currentTheme;
    // })


    // add Theme Function
    $scope.addTheme = function(obj) {
      $log('updated themes', obj);

      // add default date to obj
      obj.dateCreated = new Date();
      obj.version = '1.1';

      // add obj
      // $scope.themes.push(obj);
      themesRef.child(obj.slug).set(obj);

      // reset theme
      $scope.theme = "";

    }


    // $scope.getCurrentTheme = function(slug) {
    //     var slug = $routeParams.slug;
    //     // window.console.log($routeParams.slug);
    //     $scope.currentTheme = themesRef.child('"' + slug + '"');
    //     $log($scope.currentTheme);
    // }


    // $scope.themes = []
    // var url = "https://formulate.firebaseio.com/themes/";
    // var ref = new Firebase(url);

    // angularFire(ref, $scope, 'themes').then(function(ref) {
    //     window.console.log('themes were just loaded');
    // });


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
