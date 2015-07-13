define(['services/module'], function (services) {
  'use strict';
  services.factory('navigation', function ($window) {
    function navigate(path) {
        var realPath = path;
        if (realPath.search('#') === -1) {
            realPath = '#' + path;
        }
        $window.location.href = realPath;
    }

    // Public API here
    return {
        navigate: navigate
    };

  });
});