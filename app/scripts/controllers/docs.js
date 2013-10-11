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

    var docsPromise = angularFire(refDocs, $scope, 'docs');

    var types = ['admin', 'form', 'group', 'field', 'label', 'input', 'check', 'state', 'legend', 'help', 'placeholder', 'submit']

    // var formPromise = angularFire(refForm, $scope, 'form');
    // var fieldPromise = angularFire(refField, $scope, 'field');

    // reset values
    $scope.docs = [];
    $scope.docs.field = [];

    $scope.location = $location;


    // load Docs
    docsPromise.then(function(ref) {
      _.forEach(types, function(type) {
        if (!$scope.docs[type] || $scope.docs[type].length < 1) {
          setDocObj(type);
        }
      })
    });

    var setDocObj = function( type ) {
      var obj;

      switch (type) {
        case "field":
          obj = fieldObj;
          break;
        case "admin":
          obj = adminObj;
          break;
        case "form":
          obj = formObj;
          break;
        case "group":
          obj = groupObj;
          break;
        case "label":
          obj = labelObj;
          break;
        case "input":
          obj = inputObj;
          break;
        case "check":
          obj = checkObj;
          break;
        case "state":
          obj = stateObj;
          break;
        case "legend":
          obj = legendObj;
          break;
        case "help":
          obj = helpObj;
          break;
        case "placeholder":
          obj = placeholderObj;
          break;
        case "submit":
          obj = submitObj;
          break;
        default:
          break;
      }

      $scope.docs.push(obj);
    }

    // var setFieldDocs = function() {

      var fieldObj = {
        'formWidth': {
          'name': 'Form Width',
          'var': '$ff-form-width',
          'desc': 'Set the overall width of your form.  It\'s probably best to leave the width at 100% and size the container with a grid.',
          'default': '100%'
          }
        };

      var adminObj = {
        'formWidth': {
          'name': 'Form Width',
          'var': '$ff-form-width',
          'desc': 'Set the overall width of your form.  It\'s probably best to leave the width at 100% and size the container with a grid.',
          'default': '100%'
          }
        };

      var formObj = {
        'formWidth': {
          'name': 'Form Width',
          'var': '$ff-form-width',
          'desc': 'Set the overall width of your form.  It\'s probably best to leave the width at 100% and size the container with a grid.',
          'default': '100%'
          }
        };

      var groupObj = {
        'formWidth': {
          'name': 'Form Width',
          'var': '$ff-form-width',
          'desc': 'Set the overall width of your form.  It\'s probably best to leave the width at 100% and size the container with a grid.',
          'default': '100%'
          }
        };

      var labelObj = {
        'formWidth': {
          'name': 'Form Width',
          'var': '$ff-form-width',
          'desc': 'Set the overall width of your form.  It\'s probably best to leave the width at 100% and size the container with a grid.',
          'default': '100%'
          }
        };

      var inputObj = {
        'formWidth': {
          'name': 'Form Width',
          'var': '$ff-form-width',
          'desc': 'Set the overall width of your form.  It\'s probably best to leave the width at 100% and size the container with a grid.',
          'default': '100%'
          }
        };

      var checkObj = {
        'formWidth': {
          'name': 'Form Width',
          'var': '$ff-form-width',
          'desc': 'Set the overall width of your form.  It\'s probably best to leave the width at 100% and size the container with a grid.',
          'default': '100%'
          }
        };

      var stateObj = {
        'formWidth': {
          'name': 'Form Width',
          'var': '$ff-form-width',
          'desc': 'Set the overall width of your form.  It\'s probably best to leave the width at 100% and size the container with a grid.',
          'default': '100%'
          }
        };

      var legendObj = {
        'formWidth': {
          'name': 'Form Width',
          'var': '$ff-form-width',
          'desc': 'Set the overall width of your form.  It\'s probably best to leave the width at 100% and size the container with a grid.',
          'default': '100%'
          }
        };

      var helpObj = {
        'formWidth': {
          'name': 'Form Width',
          'var': '$ff-form-width',
          'desc': 'Set the overall width of your form.  It\'s probably best to leave the width at 100% and size the container with a grid.',
          'default': '100%'
          }
        };

      var placeholderObj = {
        'formWidth': {
          'name': 'Form Width',
          'var': '$ff-form-width',
          'desc': 'Set the overall width of your form.  It\'s probably best to leave the width at 100% and size the container with a grid.',
          'default': '100%'
          }
        };

      var submitObj = {
        'formWidth': {
          'name': 'Form Width',
          'var': '$ff-form-width',
          'desc': 'Set the overall width of your form.  It\'s probably best to leave the width at 100% and size the container with a grid.',
          'default': '100%'
          }
        };

  });
