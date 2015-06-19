define(['directives/module'], function (directives) {
    'use strict';

    directives.directive('loader', function () {
        return {
            templateUrl: "views/templates/loader.html",
            restrict: 'E',
            replace: true
        };
    });
});