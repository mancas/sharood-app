define(['controllers/module'], function (controllers) {

    'use strict';

    controllers.controller('Settings', function ($scope, navigation) {
        
        console.info("Settings controller");

        $scope.navigate = navigation.navigate;

    });

});