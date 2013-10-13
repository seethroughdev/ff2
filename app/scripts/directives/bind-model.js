'use strict';

angular.module('formulateAdminApp')
.directive('ngBindModel', function ($compile) {
  return {
    compile:function(tEl,tAtr){
      tEl[0].removeAttribute('ng-bind-model');
      return function(scope){
        tEl[0].setAttribute('ng-model',scope.$eval(tAtr.ngBindModel));
        $compile(tEl[0])(scope);
        console.info('new compiled element:',tEl[0]);
      };
    }
  };
});
