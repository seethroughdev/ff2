'use strict';

describe('Controller: ThemesCtrl', function () {

  // load the controller's module
  beforeEach(module('formulateAdminApp'));

  var ThemesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ThemesCtrl = $controller('ThemesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
