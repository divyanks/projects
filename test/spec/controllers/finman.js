'use strict';

describe('Controller: FinmanCtrl', function () {

  // load the controller's module
  beforeEach(module('projectsApp'));

  var FinmanCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FinmanCtrl = $controller('FinmanCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FinmanCtrl.awesomeThings.length).toBe(3);
  });
});
