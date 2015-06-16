define(['services/module'], function (services) {
  'use strict';
  services.factory('navigation', function ($location) {
    function navigate(path) {
        $location.path(path);
    }

    // Public API here
    return {
        navigate: navigate
    };

  });
});