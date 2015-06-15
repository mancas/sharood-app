define(['controllers/module'], function (controllers) {

    'use strict';

    controllers.controller('Home', function ($scope, sharoodDB, $location) {
        
        console.info("Home controller");

        /*if(sharoodDB.currentUser === null){
            $location.path('#/');
            return;
        }

        $scope.username = sharoodDB.currentUser.username;
        $scope.cookies = sharoodDB.currentUser.cookies;*/
        $scope.username = 'Axel';
        $scope.cookies = 31;

        $scope.navigate = function(path) {
            console.info(path);
            $location.path(path);
        };
    });

});