define(['services/module'], function (services) {
  'use strict';
  services.factory('navigation', function ($rootScope, $location) {
    function navigate(path) {
        $location.path(path);
        $rootScope.$apply();
    }

    // Public API here
    return {
        navigate: navigate
    };

  });
});