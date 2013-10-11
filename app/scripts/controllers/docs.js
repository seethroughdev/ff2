'use strict';

angular.module('formulateAdminApp')
  .controller('DocsCtrl', function ($scope, $stateParams, $log, $location, angularFire, filterFilter, Slug) {

    // add console.log
    var $log = $log.log;
    var _ = window._;

    // firebase setup
    var url = "https://formulate.firebaseio.com/",
        ref = new Firebase(url),
        refDocs = ref.child('docs'),
        refForm = refDocs.child('form'),
        refField = refDocs.child('field');

    // var docsPromise = angularFire(refDocs, $scope, 'docs');

    var formPromise = angularFire(refForm, $scope, 'form');
    var fieldPromise = angularFire(refField, $scope, 'field');

    // reset values
    $scope.docs = [];
    $scope.form = [];
    $scope.field = [];

    $scope.location = $location;

    // load Themes
    // docsPromise.then(function(ref) {
    //   startWatch($scope, filterFilter)
    // }, function(err) {
    //   $log('ERROR: Loading Themes: ' + err);
    // });

    formPromise.then(function(ref) {
      $log('form loaded')
      var obj = {
        'formWidth': {
          'name': 'Form Width',
          'var': '$ff-form-width',
          'desc': 'Set the overall width of your form.  It\'s probably best to leave the width at 100% and size the container with a grid.',
          'default': '100%'
        }
      };

      if ($scope.form.length < 1) {
        $scope.form.push(obj);
      }

    });

    fieldPromise.then(function(ref) {
      $log('field loaded')
      var obj = {
        'formWidth': {
          'name': 'Form Width',
          'var': '$ff-form-width',
          'desc': 'Set the overall width of your form.  It\'s probably best to leave the width at 100% and size the container with a grid.',
          'default': '100%'
        }
      };

      if ($scope.field.length < 1) {
        $scope.field.push(obj);
      }

    });


    var startWatch = function ($scope, filter) {


      $scope.$watch('docs', function() {
      });

      // watch location path for changes
      $scope.$watch('location.path()', function(path) {

      });



    };

    var setupDocs = function() {
      var defaultDocs = {
        'themeIdCounter': 101,
        'url': 'http://formulatecss.com'
      };

      if ($scope.docs.length < 1) {
        $scope.admin.push(defaultAdmin);
        $scope.admin = $scope.admin[0];
      }
    };



  });
