'use strict';

angular.module('formulateAdminApp')
  .factory('themeService', function ($log, $rootScope, angularFire) {
    // Service logic
    // ...

    // firebase setup
    var url = "https://formulate.firebaseio.com/",
        ref = new Firebase(url),
        refThemes = ref.child('themes');


    var themesObj = {
      getThemes: function(scope, localScopeName) {
        return angularFire(refThemes, scope, localScopeName);
      },

      getHightestId: function() {

        // getting the highest ID of previous theme
        // I know this is not performant from angular forEach,
        // But this is only running as a failsafe in case I lose
        // the current last Theme ID by any chance
        var themes = angularFire(refThemes, $rootScope, 'themes');
        var arr = [];

        return themes
          .then(function(){
            $log.log('Checking for highest Id');
          })
          .then(function() {
            // getting highest value in the array
            angular.forEach($rootScope.themes, function(val, key) {
              arr.push(val.id);
            });

            return arr;
          })
          .then(function(arr) {
            arr = arr.sort();
            arr = arr.reverse();
            $log.log('new array is ', arr);

            return arr[0];
          });

        // trying to find a way to get the value of arr from themes promise out to the other service to get the value -AL

      },

      addTheme: function(vars, theme) {
        var docVars = vars,
            obj     = theme;

        // set theme defaults if empty
        angular.forEach(docVars, function(val, key) {
          if (obj[key] === undefined) {
            obj[key] = {};
          }
          angular.forEach(val, function(v, k) {
            if (obj[key][k] === undefined || obj[key][k] === '') {
              obj[key][k] = v.default;
            }
          });
        });

        obj.detail.dateCreated = new Date();
        obj.detail.version = '1.1';
        obj.detail.favorites = 0;

        return obj;
      }

    }

    // Public API here
    return themesObj;
  });
