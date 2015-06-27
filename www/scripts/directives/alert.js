define(['directives/module'], function (directives) {
    'use strict';

    directives.directive('alert', function () {
        const defaultConfig = {
            icon: true,
            title: 'Are you sure?',
            subtitle: 'You will not be able to undo this operation!',
            cancel: {
                id: 'cancel-btn',
                text: 'Cancel'
            },
            ok: {
                id: 'delete-account-btn',
                text: 'Yes, delete it'
            }
        };

        return {
            templateUrl: "views/templates/alert.html",
            restrict: 'E',
            replace: true,
            scope: {
                config: '='
            }
        };
    });
});