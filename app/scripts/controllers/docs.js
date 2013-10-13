'use strict';

angular.module('formulateAdminApp')
  .controller('DocsCtrl', function ($scope, $stateParams, $log, $location, angularFire, filterFilter, Slug, docService) {

    // add console.log
    var $log = $log.log;
    var _ = window._;

    // firebase setup
    var url = 'https://formulate.firebaseio.com/',
        ref = new Firebase(url),
        refDocs = ref.child('docs'),
        refVars = refDocs.child('vars');


    var types = ['admin', 'color', 'form', 'group', 'field', 'label', 'input', 'check', 'state', 'legend', 'help', 'placeholder', 'submit'];


    // reset values
    $scope.docs = [];
    $scope.vars = [];

    $scope.location = $location;

    docService.getVars($scope, 'vars').then(function() {
      setupVars();
      $log('loaded vars');
    })

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
          varsObj[type] = obj;
        })
        $scope.vars = varsObj;
      }
    };

    // the problem here is that with js i can push the array with [] dynamic, but firebase stores it as an object, (which they say is better), but it prevents me from dynamically creating objects.

    // var setFieldDocs = function() {

      var formObj = {
        'width': {
          'name': 'Width',
          'var': '$ff-form-width',
          'desc': 'Set the overall width of your form.  It\'s probably best to leave the width at 100% and size the container with a grid.',
          'default': '100%'
          },
        'maxWidth': {
          'name': 'Max Width',
          'var': '$ff-form-max-width',
          'desc': 'Set the max-width of your form.',
          'default': '500px'
        },
        'bg': {
          'name': 'Background Color',
          'var': '$ff-form-bg',
          'desc': 'Set the background color of your form',
          'default': 'transparent'
        },
        'padding': {
          'name': 'Padding',
          'var': '$ff-form-padding',
          'desc': 'Padding of the outside of your form.  This uses border-box, so the outer width you specify will stay consistent.  And it will push inside.',
          'default': '0'
        },
        'fontFamily': {
          'name': 'Font Family',
          'var': '$ff-form-font-family',
          'desc': 'Set the overall font-family of your form.',
          'default': 'inherit'
        },
        'fontSize': {
          'name': 'Font Size',
          'var': '$ff-form-font-size',
          'desc': 'Set the overall font size of your form.',
          'default': 'inherit'
        },
        'fontWeight': {
          'name': 'Font Weight',
          'var': '$ff-form-font-weight',
          'desc': 'Set the overall font weight of your form.',
          'default': 'inherit'
        },
        'textTransform': {
          'name': 'Text Transform',
          'var': '$ff-form-text-transform',
          'desc': 'Set the text-transform of your form.',
          'help': 'uppercase|lowercase|capitalize|none',
          'default': 'none'
        },
        'color': {
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
        'normalize': {
          'name': 'Import Normalize',
          'var': '$ff-import-normalize',
          'desc': 'If you are not already using Nicolas Galaghers\'s Normalize (hint: you should be), then leave this to true to insert the "form" portion of the code.  If you are already loading Normalize.  Set this to false.',
          'default': true
        },
        'boxSizing': {
          'name': 'Import Box Sizing',
          'var': '$ff-import-box-sizing',
          'desc': 'This css makes use of Paul Irish\'s border-box method.  If you are already using it.  Set this to false.  ',
          'default': true
        },
        'bootstrap': {
          'name': 'Twitter Bootstrap Compatible',
          'var': '$ff-use-twitter-bootstrap',
          'desc': 'Set this to true if you are using Twitter Bootstrap.  This adds a few KB to your CSS, so only set it to true if you need to use Twitter Bootstrap form styles at the same time.',
          'default': 'false'
        }
      };

      var groupObj = {
        'stacked': {
          'name': 'Group Stacked',
          'var': '$ff-group-stacked',
          'desc': 'Set this to true if you want to have your group fields stacked on top of each other.  This is a common mobile pattern.',
          'default': 'false'
          },
        'marginBottom': {
          'name': 'Group Margin Bottom',
          'var': '$ff-group-margin-bottom',
          'desc': 'Set the bottom margin of your groups.  Good for separating out sections of your form.',
          'default': '0'
        },
        'bg': {
          'name': 'Group Background Color',
          'var': '$ff-group-background',
          'desc': 'Set the background color of your group if you want it different than the form background.',
          'default': 'inherit'
        },
        'padding': {
          'name': 'Group Padding',
          'var': '$ff-group-padding',
          'desc': 'Set the padding between the grouped fields.  Keep in mind this uses border-box, so the width will stay consistent and the inside will pad.',
          'default': '0'
        }
      };

      var fieldObj = {
        'bg': {
          'name': 'Field Background Color',
          'var': '$ff-field-bg',
          'desc': 'Set the default background color of the fields.',
          'default': 'inherit'
        },
        'bgRound': {
          'name': 'Field Border Radius',
          'var': '$ff-field-round',
          'desc': 'Set the border-radius of the input fields.  This will adapt if you are using label-caps, or label-stacked.',
          'help': 'Set as px or %',
          'default': '0'
        },
        'padding': {
          'name': 'Field Padding',
          'var': '$ff-field-padding',
          'desc': 'Set the padding between fields.',
          'default': '0'
        },
        'marginBottom': {
          'name': 'Field Margin Bottom',
          'var': '$ff-field-margin-bottom',
          'desc': 'Set the bottom margin of each field.',
          'default': '0'
        }
      };

      var labelObj = {
        'display': {
          'name': 'Label Display',
          'var': '$ff-label-display',
          'desc': 'Set to true if you want to display labels in your form.',
          'default': true
          },
        'width': {
          'name': 'Label Width',
          'var': '$ff-label-width',
          'desc': 'Set the width of your labels.  This applies to left and right positioned labels.  Including label-caps and label-inside.',
          'help': 'Use %, px or em',
          'default': '25%'
          },
        'position': {
          'name': 'Label Position',
          'var': '$ff-label-position',
          'desc': 'Set the position of your label.',
          'help': 'top, left, right, bottom',
          'default': 'top'
        },
        'align': {
          'name': 'Label Align',
          'var': '$ff-label-align',
          'desc': 'Set the text alignment of your labels.',
          'help': 'left, right, center',
          'default': 'left'
        },
        'fontSize': {
          'name': 'Label Font Size',
          'var': '$ff-label-font-size',
          'desc': 'Set the font-size of your labels.',
          'default': 'inherit'
        },
        'fontWeight': {
          'name': 'Label Font Weight',
          'var': '$ff-label-font-weight',
          'desc': 'Set the font-weight of your labels.',
          'default': 'inherit'
        },
        'fontFamily': {
          'name': 'Label Font Family',
          'var': '$ff-label-font-family',
          'desc': 'Set the font-family of your labels.  This is what you would probably change if you were using icons instead of text.',
          'default': 'inherit'
        },
        'color': {
          'name': 'Label Text Color',
          'var': '$ff-label-color',
          'desc': 'Set the text color of your labels.',
          'default': 'inherit'
        },
        'textTransform': {
          'name': 'Label Text Transform',
          'var': '$ff-label-text-tranform',
          'desc': 'Set the text transform of your labels.',
          'help': 'uppercase|lowercase|capitalize|none',
          'default': 'inherit'
        },
        'paddingHorizontal': {
          'name': 'Label Padding Horizontal',
          'var': '$ff-label-padding-horizontal',
          'desc': 'Set this to add padding to the left and right of your inputs.',
          'default': '0'
        },
        'offset': {
          'name': 'Label Offset',
          'var': '$ff-label-offset',
          'desc': 'If you use em for $ff-input-height, you might need to tweak the height.  If you use px it will be correct.',
          'default': '0'
        },
        'cap': {
          'name': 'Label Caps',
          'var': '$ff-label-cap',
          'desc': 'Set this to true if you want to cap your labels.',
          'default': 'false'
        },
        'capBg': {
          'name': 'Label Cap Background',
          'var': '$ff-label-cap-bg',
          'desc': 'Set the background of your label caps.',
          'default': 'inherit'
        },
        'capBgImg': {
          'name': 'Label Cap Background Image',
          'var': '$ff-label-cap-bg-image',
          'desc': 'If you want to set a gradient for your label cap.  The Compass mixin is already included.  So you can just add the colors and stops.',
          'help': 'ex. $light 10%, $primary 50%, $dark',
          'default': 'none'
        },
        'capBoxShadow': {
          'name': 'Label Cap Box Shadow',
          'var': '$ff-label-cap-bo-shadow',
          'desc': 'Add the box-shadow CSS if here if you want to style your caps with a box-shadow.',
          'help': 'ex. inset 1px 1px 3px 3px $black',
          'default': 'none'
        },
        'inside': {
          'name': 'Label Inside',
          'var': '$ff-label-inside',
          'desc': 'Set this to true if you want to include the label inside your input.  This works with left and right label positioning.',
          'default': 'false'
        }
      };

      var inputObj = {
        'fontSize': {
          'name': 'Input Font Size',
          'var': '$ff-input-font-size',
          'desc': 'Override the font-size of your input text.',
          'default': 'inherit'
          },
        'fontWeight': {
          'name': 'Input Font Weight',
          'var': '$ff-input-font-weight',
          'desc': 'Override the font-weight of your input text.',
          'default': 'inherit'
        },
        'height': {
          'name': 'Input Height',
          'var': '$ff-input-height',
          'desc': 'Set the height of your input.  hint: Browsers expect height to be set in pixels.  Not ems!  You can still use it if you need to, but you will have to tweak the label height above.',
          'help': 'Use pixels if you can!',
          'default': '45px'
        },
        'paddingHorizontal': {
          'name': 'Input Padding Horizontal',
          'var': '$ff-input-padding-horizontal',
          'desc': 'Add padding to the left and right of your inputs.',
          'default': '15px'
        },
        'round': {
          'name': 'Input Border Radius',
          'var': '$ff-input-round',
          'desc': 'Set the rounded corners of your input.',
          'default': '0'
        },
        'color': {
          'name': 'Input Text Color',
          'var': '$ff-input-color',
          'desc': 'Set the text color of your inputs.',
          'default': 'inherit'
        },
        'bg': {
          'name': 'Input Background Color',
          'var': '$ff-input-bg',
          'desc': 'Set the background color of your inputs.',
          'default': '$white'
        },
        'bgImg': {
          'name': 'Input Background Image',
          'var': '$ff-input-bg-img',
          'desc': 'If you want to set a gradient for your input.  The Compass mixin is already included.  So you can just add the colors and stops.',
          'help': 'ex. $light, $white 10px',
          'default': 'none'
        },
        'borderStyle': {
          'name': 'Input Border Style',
          'var': '$ff-input-border-style',
          'desc': 'Set the border style of your inputs.',
          'help': 'solid|dashed|none',
          'default': 'solid'
        },
        'borderColor': {
          'name': 'Input Border Color',
          'var': '$ff-input-border-color',
          'desc': 'Set the border color of your inputs.',
          'default': '$black'
        },
        'borderWidth': {
          'name': 'Input Border Width',
          'var': '$ff-input-border-width',
          'desc': 'Set the border width of your inputs.',
          'default': '1px'
        },
        'boxShadow': {
          'name': 'Input Box Shadow',
          'var': '$ff-input-box-shadow',
          'desc': 'Set the box shadow of your input.',
          'help': 'ex. inset 1px 1px 3px 3px $black',
          'default': 'none'
        }
      };

      var checkObj = {
        'color': {
          'name': 'Checkbox/Radio Color',
          'var': '$ff-check-radio-color',
          'desc': 'Set the color of the text label in your checkboxes and radio buttons.',
          'default': 'inherit'
        },
        'hoverColor': {
          'name': 'Checkbox/Radio Hover Color',
          'var': '$ff-check-radio-hover-color',
          'desc': 'Set the hover-color of the text label in your checkboxes and radio buttons.',
          'default': 'inherit'
        }
      };

      var stateObj = {
        'style': {
          'name': 'State Border Style',
          'var': '$ff-state-style',
          'desc': 'Select whether to show the state of your input with border, shadow, or none',
          'help': 'border|shadow|none',
          'default': 'border'
          },
        'shadow': {
          'name': 'State Shadow Style',
          'var': '$ff-state-shadow',
          'desc': 'If you selected Shadow for your state.  Set the shadow style here.',
          'help': 'ex. 0px 0px 3px 2px',
          'default': 'none'
        },
        'focusLabelColor': {
          'name': 'State Label Color',
          'var': '$ff-state-focus-label-color',
          'desc': 'Set the color of your label when the input is focused.',
          'default': 'inherit'
        },
        'focusInputBg': {
          'name': 'State Input Background',
          'var': '$ff-state-focus-input-bg',
          'desc': 'Set the background color of your input on focus.',
          'default': 'inherit'
        },
        'disabledColor': {
          'name': 'State Disabled Color',
          'var': '$ff-state-disabled',
          'desc': 'Set the color for disabled state.',
          'default': '$grey'
        },
        'invalidColor': {
          'name': 'State Invalid Color',
          'var': '$ff-state-invalid',
          'desc': 'Set the color for invalid state.',
          'default': '$red'
        },
        'successColor': {
          'name': 'State Success Color',
          'var': '$ff-state-success',
          'desc': 'Set the color for success state.',
          'default': '$green'
        },
        'requiredColor': {
          'name': 'State Required Color',
          'var': '$ff-state-required',
          'desc': 'Set the color for success state.',
          'default': 'inherit'
        },
        'helpChangeColor': {
          'name': 'Change Help on State',
          'var': '$ff-state-help-change-color',
          'desc': 'Set to true if you want your help text to change on state.',
          'default': true
        },
        'labelChangeColor': {
          'name': 'Change Label on State',
          'var': '$ff-state-label-change-color',
          'desc': 'Set to true if you want your label text to change on state.',
          'default': true
        },
        'changeOnSuccess': {
          'name': 'Change State on Success',
          'var': '$ff-state-change-on-success',
          'desc': 'Set to true if you want to change values to success state when they\'re valid.',
          'default': 'false'
        }

      };

      var legendObj = {
        'display': {
          'name': 'Legend Display',
          'var': '$ff-legend-display',
          'desc': 'Set this to false if you want to hide the Legend.',
          'default': true
        },
        'fontSize': {
          'name': 'Legend Font Size',
          'var': '$ff-legend-font-size',
          'desc': 'Override the font-size of the legend.',
          'default': 'inherit'
        },
        'color': {
          'name': 'Legend Color',
          'var': '$ff-legend-color',
          'desc': 'Set the color of your legend.',
          'default': 'inherit'
        },
        'marginBottom': {
          'name': 'Legend Margin Bottom',
          'var': '$ff-legend-margin-bottom',
          'desc': 'Set the margin below the legend',
          'default': '1em'
        },
        'textAlign': {
          'name': 'Legend Text Align',
          'var': '$ff-legend-text-align',
          'desc': 'Set the text-alignment of your legend.',
          'help': 'left|right|center',
          'default': 'left'
        },
        'fontWeight': {
          'name': 'Legend Font Weight',
          'var': '$ff-legend-font-weight',
          'desc': 'Set the font-weight of your legend.',
          'default': 'inherit'
        },
        'textTransform': {
          'name': 'Legend Text Transform',
          'var': '$ff-legend-text-transform',
          'desc': 'Set the text-transform of your legend.',
          'help': 'uppercase|lowercase|capitalize|none',
          'default': 'none'
        }
      };

      var helpObj = {
        'display': {
          'name': 'Display Help Text',
          'var': '$ff-help-display',
          'desc': 'Set to true to display help text on your form.',
          'default': true
        },
        'displayOnFocus': {
          'name': 'Display Help on Focus',
          'var': '$ff-help-display-on-focus',
          'desc': 'Set to true to only display help text when input is focused.',
          'default': 'false'
        },
        'color': {
          'name': 'Help Text Color',
          'var': '$ff-help-color',
          'desc': 'Set the color of your help text.',
          'default': 'inherit'
        },
        'fontSize': {
          'name': 'Help Text Font-Size',
          'var': '$ff-help-font-size',
          'desc': 'Override the size of your help text.',
          'default': '.9em'
        },
        'textAlign': {
          'name': 'Help Text Align',
          'var': '$ff-help-text-align',
          'desc': 'Set the text-alignment of your help.',
          'help': 'left|right|center',
          'default': 'left'
        }
      };

      var placeholderObj = {
        'display': {
          'name': 'Placeholder Text Display',
          'var': '$ff-placeholder-display',
          'desc': 'Set to false to hide placeholder text.',
          'default': true
        },
        'color': {
          'name': 'Placeholder Text Color',
          'var': '$ff-placeholder-color',
          'desc': 'Set the color of your placeholder text.',
          'default': '$grey'
        }
      };

      var submitObj = {
        'bg': {
          'name': 'Submit Background Color',
          'var': '$ff-submit-bg',
          'desc': 'Set the background color of your submit button.',
          'default': 'inherit'
        },
        'bgHover': {
          'name': 'Submit Hover Background Color',
          'var': '$ff-submit-hover-bg',
          'desc': 'Set the hover background color of your submit button.',
          'default': 'inherit'
        },
        'bgImg': {
          'name': 'Submit Button Background Image',
          'var': '$ff-submit-bg-img',
          'desc': 'If you want to set a gradient for your submit button.  The Compass mixin is already included.  So you can just add the colors and stops.',
          'help': 'ex. $light 10%, $primary 50%, $dark',
          'default': 'none'
        },
        'color': {
          'name': 'Submit Text Color',
          'var': '$ff-submit-color',
          'desc': 'Set the text color of your submit button.',
          'default': 'inherit'
        },
        'colorHover': {
          'name': 'Submit Text Hover Color',
          'var': '$ff-submit-hover-color',
          'desc': 'Set the hover text color of your submit button.',
          'default': 'inherit'
        },
        'textShadow': {
          'name': 'Submit Text Shadow',
          'var': '$ff-submit-text-shadow',
          'desc': 'Set the text-shadow of your button text.',
          'help': '1px 1px $black',
          'default': 'none'
        },
        'boxShadow': {
          'name': 'Submit Box Shadow',
          'var': '$ff-submit-box-shadow',
          'desc': 'Set the box-shadow of your submit button.',
          'help': 'ex. inset 1px 1px 3px 3px $black',
          'default': 'none'
        },
        'borderColor': {
          'name': 'Submit Border Color',
          'var': '$ff-submit-border-color',
          'desc': 'Set the border color of your submit button.',
          'default': '$black'
        },
        'borderWidth': {
          'name': 'Submit Border Width',
          'var': '$ff-submit-border-width',
          'desc': 'Set the border width of your submit button.',
          'help': 'Set this to 0 to disable.',
          'default': '0'
        },
        'borderStyle': {
          'name': 'Submit Border Style',
          'var': '$ff-submit-border-style',
          'desc': 'Set the border style of your submit button.',
          'help': 'solid|dashed|none',
          'default': 'solid'
        },
        'fontSize': {
          'name': 'Submit Font-Size',
          'var': '$ff-submit-font-size',
          'desc': 'Override the font-size of your submit button.',
          'default': 'inherit'
        },
        'height': {
          'name': 'Submit Button Height',
          'var': '$ff-submit-height',
          'desc': 'Set the height of your submit button.',
          'default': '3em'
        },
        'textTransform': {
          'name': 'Submit Text Transform',
          'var': '$ff-submit-text-transform',
          'desc': 'Set the text-transform of your submit button.',
          'help': 'uppercase|lowercase|capitalize|none',
          'default': 'none'
        },
        'fontWeight': {
          'name': 'Submit Font Weight',
          'var': '$ff-submit-font-weight',
          'desc': 'Set the overall font weight of your submit button.',
          'default': 'inherit'
        }
      };

  });
