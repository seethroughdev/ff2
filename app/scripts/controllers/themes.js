'use strict';

angular.module('formulateAdminApp')
  .controller('ThemesCtrl', function ($scope, $routeParams, $log, angularFireCollection, angularFire, Slug) {

    // add console.log
    var $log = $log.log;

    var url = "https://formulate.firebaseio.com/";
    var ref = new Firebase(url);

    var themeRef = ref.child('themes');

    // add snapshots onload
    themeRef.on('value', function(snapshot) {
        if(snapshot.val() === null) {
            $log('There are no current themes!');
        } else {
            $log('snapshot is', snapshot.val());
            $scope.themes = snapshot.val();
            $scope.$apply();
        }
    })

    // add Theme
    $scope.addTheme = function(obj) {
        window.console.log('updated themes', obj);

        obj.dateCreated = new Date();
        themeRef.child(obj.slug).set(obj);

        $scope.theme = "";


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
