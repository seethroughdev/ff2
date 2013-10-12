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
          'desc': 'Set the text-transform of your form.',
          'help': 'uppercase|lowercase|none'
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
        'importNormalize': {
          'name': 'Import Normalize',
          'var': '$ff-import-normalize',
          'desc': 'If you are not already using Nicolas Galaghers\'s Normalize (hint: you should be), then leave this to true to insert the "form" portion of the code.  If you are already loading Normalize.  Set this to false.',
          'default': true
        },
        'importBoxSizing': {
          'name': 'Import Box Sizing',
          'var': '$ff-import-box-sizing',
          'desc': 'This css makes use of Paul Irish\'s border-box method.  If you are already using it.  Set this to false.  ',
          'default': true
        },
        'useTwitterBootstrap': {
          'name': 'Twitter Bootstrap Compatible',
          'var': '$ff-use-twitter-bootstrap',
          'desc': 'Set this to true if you are using Twitter Bootstrap.  This adds a few KB to your CSS, so only set it to true if you need to use Twitter Bootstrap form styles at the same time.',
          'default': 'false'
        }
      };

      var groupObj = {
        'groupStacked': {
          'name': 'Group Stacked',
          'var': '$ff-group-stacked',
          'desc': 'Set this to true if you want to have your group fields stacked on top of each other.  This is a common mobile pattern.',
          'default': 'false'
          },
        'groupMarginBottom': {
          'name': 'Group Margin Bottom',
          'var': '$ff-group-margin-bottom',
          'desc': 'Set the bottom margin of your groups.  Good for separating out sections of your form.',
          'default': '0'
        },
        'groupBg': {
          'name': 'Group Background Color',
          'var': '$ff-group-background',
          'desc': 'Set the background color of your group if you want it different than the form background.',
          'default': 'inherit'
        },
        'groupPadding': {
          'name': 'Group Padding',
          'var': '$ff-group-padding',
          'desc': 'Set the padding between the grouped fields.  Keep in mind this uses border-box, so the width will stay consistent and the inside will pad.',
          'default': '0'
        }
      };

      var fieldObj = {
        'fieldBg': {
          'name': 'Field Background Color',
          'var': '$ff-field-bg',
          'desc': 'Set the default background color of the fields.',
          'default': '$white'
        },
        'fieldBgRound': {
          'name': 'Field Border Radius',
          'var': '$ff-field-round',
          'desc': 'Set the border-radius of the input fields.  This will adapt if you are using label-caps, or label-stacked.',
          'help': 'Set as px or %'
          'default': '0'
        },
        'fieldPadding': {
          'name': 'Field Padding',
          'var': '$ff-field-padding',
          'desc': 'Set the padding between fields.',
          'default': '0'
        },
        'fieldMarginBottom': {
          'name': 'Field Margin Bottom',
          'var': '$ff-field-margin-bottom',
          'desc': 'Set the bottom margin of each field.',
          'default': '0'
        }
      };

      var labelObj = {
        'labelDisplay': {
          'name': 'Label Display',
          'var': '$ff-label-display',
          'desc': 'Set to true if you want to display labels in your form.',
          'default': true
          },
        'labelWidth': {
          'name': 'Label Width',
          'var': '$ff-label-width',
          'desc': 'Set the width of your labels.  This applies to left and right positioned labels.  Including label-caps and label-inside.',
          'help': 'Use %, px or em',
          'default': '25%'
          },
        'labelPosition': {
          'name': 'Label Position',
          'var': '$ff-label-position',
          'desc': 'Set the position of your label.',
          'help': 'top, left, right, bottom'
          'default': 'top'
        },
        'labelAlign': {
          'name': 'Label Align',
          'var': '$ff-label-align',
          'desc': 'Set the text alignment of your labels.',
          'help': 'left, right, center'
          'default': 'left'
        },
        'labelFontSize': {
          'name': 'Label Font Size',
          'var': '$ff-label-font-size',
          'desc': 'Set the font-size of your labels.',
          'default': 'inherit'
        },
        'labelFontWeight': {
          'name': 'Label Font Weight',
          'var': '$ff-label-font-weight',
          'desc': 'Set the font-weight of your labels.',
          'default': 'inherit'
        },
        'labelFontFamily': {
          'name': 'Label Font Family',
          'var': '$ff-label-font-family',
          'desc': 'Set the font-family of your labels.  This is what you would probably change if you were using icons instead of text.',
          'default': 'inherit'
        },
        'labelColor': {
          'name': 'Label Text Color',
          'var': '$ff-label-color',
          'desc': 'Set the text color of your labels.',
          'default': 'inherit'
        },
        'labelTextTransform': {
          'name': 'Label Text Transform',
          'var': '$ff-label-text-tranform',
          'desc': 'Set the text transform of your labels.',
          'help': 'uppercase, lowercase, none'
          'default': 'inherit'
        },
        'labelPaddingHorizontal': {
          'name': 'Label Padding Horizontal',
          'var': '$ff-label-padding-horizontal',
          'desc': 'Set this to add padding to the left and right of your inputs.',
          'default': '0'
        },
        'labelOffset': {
          'name': 'Label Offset',
          'var': '$ff-label-offset',
          'desc': 'If you use em for $ff-input-height, you might need to tweak the height.  If you use px it will be correct.',
          'default': '0'
        },
        'labelCap': {
          'name': 'Label Caps',
          'var': '$ff-label-cap',
          'desc': 'Set this to true if you want to cap your labels.',
          'default': 'false'
        },
        'labelCapBg': {
          'name': 'Label Cap Background',
          'var': '$ff-label-cap-bg',
          'desc': 'Set the background of your label caps.',
          'default': 'inherit'
        },
        'labelCapBgImg': {
          'name': 'Label Cap Background Image',
          'var': '$ff-label-cap-bg-image',
          'desc': 'If you want to set a gradient for your label cap.  The Compass mixin is already included.  So you can just add the colors and stops.',
          'help': 'ex. $light 10%, $primary 50%, $dark',
          'default': 'none'
        },
        'labelCapBoxShadow': {
          'name': 'Label Cap Box Shadow',
          'var': '$ff-label-cap-bo-shadow',
          'desc': 'Add the box-shadow CSS if here if you want to style your caps with a box-shadow.',
          'help': 'ex. inset 1px 1px 3px 3px $black',
          'default': 'none'
        },
        'labelInside': {
          'name': 'Label Inside',
          'var': '$ff-label-inside',
          'desc': 'Set this to true if you want to include the label inside your input.  This works with left and right label positioning.',
          'default': 'false'
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
