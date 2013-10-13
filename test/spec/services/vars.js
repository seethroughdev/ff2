'use strict';

describe('Service: vars', function () {

  // load the service's module
  beforeEach(module('formulateAdminApp'));

  // instantiate service
  var vars;
  beforeEach(inject(function (_vars_) {
    vars = _vars_;
  }));

  it('should do something', function () {
    expect(!!vars).toBe(true);
  });

});
