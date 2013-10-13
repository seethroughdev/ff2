'use strict';

describe('Directive: bindModel', function () {

  // load the directive's module
  beforeEach(module('formulateAdminApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<bind-model></bind-model>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the bindModel directive');
  }));
});
