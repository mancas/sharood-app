define(['controllers/module'], function (controllers) {

    'use strict';

    controllers.controller('Meals', function ($scope, sharoodDB, navigation) {
        
        console.info("Meals controller");

        /*if(sharoodDB.currentUser === null){
            navigation.navigate('#/');
            return;
        }

        $scope.username = sharoodDB.currentUser.username;
        $scope.cookies = sharoodDB.currentUser.cookies;*/
        $scope.username = 'Axel';
        $scope.cookies = 31;

        $scope.navigate = navigation.navigate;
    });

});