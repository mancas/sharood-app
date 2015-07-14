define(['controllers/module'], function (controllers) {

    'use strict';

    controllers.controller('Home', function ($scope, sharoodDB, navigation) {
        
        console.info("Home controller");

        if(sharoodDB.currentUser === null){
            navigation.navigate('#/');
            return;
        }

        $scope.username = sharoodDB.currentUser.username;
        $scope.cookies = sharoodDB.currentUser.cookies;

        /*
        $scope.username = 'Axel';
        $scope.cookies = 31;
        */

        var d = new Date();
        d.setHours(11);
        d.setMinutes(12);  
        d.setSeconds(0); 
        d.setDate(d.getDate() + 1);
        alert(d.toString());

        $scope.navigate = navigation.navigate;
    });

});