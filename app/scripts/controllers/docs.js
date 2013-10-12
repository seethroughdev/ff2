'use strict';

angular.module('formulateAdminApp')
  .controller('DocsCtrl', function ($scope, $stateParams, $log, $location, angularFire, filterFilter, Slug) {

    // add console.log
    var $log = $log.log;
    var _ = window._;

    // firebase setup
    var url = 'https://formulate.firebaseio.com/',
        ref = new Firebase(url),
        refDocs = ref.child('docs'),
        refVars = refDocs.child('vars');

    var varsPromise = angularFire(refVars, $scope, 'vars');

    var types = ['admin', 'color', 'form', 'group', 'field', 'label', 'input', 'check', 'state', 'legend', 'help', 'placeholder', 'submit'];

    // var formPromise = angularFire(refForm, $scope, 'form');
    // var fieldPromise = angularFire(refField, $scope, 'field');

    // reset values
    $scope.docs = [];
    $scope.vars = [];

    $scope.location = $location;


    varsPromise.then(function(ref) {
      setupVars();
      $log('loaded vars');
    });

    // fieldPromise.then(function(ref) {
    //   if ($scope.field.length === 0) {
    //     var obj = setDocObj('field');
    //     $scope.field.push(obj);
    //   }
    // })

    var setDocObj = function( type ) {
      var obj;

      switch (type) {
        case "field":
          obj = fieldObj;
          break;
        case "admin":
          obj = adminObj;
          break;
        case "color":
          obj = colorObj;
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

      return obj;
    };

    // if vars don't exist, iterate and push
    var setupVars = function () {
      if ($scope.vars.length === 0) {
        var varsObj = {};
        _.forEach(types, function(type, i) {
          var obj = setDocObj(type);
          $log('obj', type)
          varsObj[type] = obj;
        })
        $scope.vars = varsObj;
      }
    };

    // the problem here is that with js i can push the array with [] dynamic, but firebase stores it as an object, (which they say is better), but it prevents me from dynamically creating objects.

    // var setFieldDocs = function() {

      var formObj = {
        'formWidth': {
          'name': 'Width',
          'var': '$ff-form-width',
          'desc': 'Set the overall width of your form.  It\'s probably best to leave the width at 100% and size the container with a grid.',
          'default': '100%'
          },
        'formMaxWidth': {
          'name': 'Max Width',
          'var': '$ff-form-max-width',
          'desc': 'Set the max-width of your form.',
          'default': '500px'
        },
        'formBg': {
          'name': 'Background Color',
          'var': '$ff-form-bg',
          'desc': 'Set the background color of your form',
          'default': 'transparent'
        },
        'formPadding': {
          'name': 'Padding',
          'var': '$ff-form-padding',
          'desc': 'Padding of the outside of your form.  This uses border-box, so the outer width you specify will stay consistent.  And it will push inside.',
          'default': '0'
        },
        'formFontFamily': {
          'name': 'Font Family',
          'var': '$ff-form-font-family',
          'desc': 'Set the overall font-family of your form.',
          'default': 'inherit'
        },
        'formFontSize': {
          'name': 'Font Size',
          'var': '$ff-form-font-size',
          'desc': 'Set the overall font size of your form.',
          'default': 'inherit'
        },
        'formFontWeight': {
          'name': 'Font Weight',
          'var': '$ff-font-weight',
          'desc': 'Set the overall font weight of your form.',
          'default': 'inherit'
        },
        'formTextTransform': {
          'name': 'Text Transform',
          'var': '$ff-form-text-transform',
          'desc': 'Set the text-transform of your form.  uppercase|lowercase|none',
          'default': 'none'
        },
        'formColor': {
          'name': 'Text Color',
          'var': '$ff-form-color',
          'desc': 'Set the overall text color of your form.',
          'default': 'inherit'
        }
      };

      var colorObj = {
        'black': {
          'name': 'Black',
          'var': '$black',
          'desc': 'Set the black color for your forms.',
          'default': 'hsla(0.00, 20.00%, 14.71%, 1.00)'
        },
        'white': {
          'name': 'White',
          'var': '$white',
          'desc': 'Set the white color for your forms.',
          'default': 'hsla(48.57, 46.67%, 91.18%, 1.00)'
        },
        'red': {
          'name': 'Red',
          'var': '$red',
          'desc': 'Set the red color for your forms.  This is generally the error state color as well.',
          'default': 'hsla(9.03, 100.00%, 44.31%, 1.00)'
        },
        'green': {
          'name': 'Green',
          'var': '$green',
          'desc': 'Set the green color for your forms.  This is generally the success state color as well.',
          'default': 'hsla(94.29, 12.50%, 56.08%, 1.00)'
        },
        'primary': {
          'name': 'Primary',
          'var': '$primary',
          'desc': 'Set the primary color for your forms.',
          'default': 'hsla(205.09, 24.44%, 55.88%, 1.00)'
        },
        'secondary': {
          'name': 'Secondary',
          'var': '$secondary',
          'desc': 'Set the secondary color for your forms.',
          'default': 'hsla(77.65, 48.57%, 86.27%, 1.00)'
        },
        'grey': {
          'name': 'Grey',
          'var': '$grey',
          'desc': 'Set the grey color for your forms.',
          'default': 'hsla(60.00, 17.46%, 75.29%, 1.00)'
        },
        'dark': {
          'name': 'Dark',
          'var': '$dark',
          'desc': 'Set the dark color for your forms.  Use this variable as a darker version of your primary, or any of your variables.',
          'default': 'darken($primary, 8%)'
        },
        'light': {
          'name': 'Light',
          'var': '$light',
          'desc': 'Set the light color for your forms.  Use this variable as a lighter version of your primary, or any of your variables.',
          'default': 'lighten($primary, 8%)'
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

      var fieldObj = {
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
