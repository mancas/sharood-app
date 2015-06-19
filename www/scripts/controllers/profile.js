define(['controllers/module'], function (controllers) {

    'use strict';

    controllers.controller('Profile', function ($scope, sharoodDB, navigation) {

        console.info("Profile controller");

        /*if(sharoodDB.currentUser === null){
            navigation.navigate('#/');
            return;
        }

        $scope.cookies = sharoodDB.currentUser.cookies;
        $scope.name = sharoodDB.currentUser.first_name;
        $scope.phone = sharoodDB.currentUser.phone;
        $scope.email = sharoodDB.currentUser.email;*/

        $scope.cookies = 21;
        $scope.name = 'Axel';
        $scope.phone = '638006787';
        $scope.email = 'mancas.91@gmail.com';

        $scope.logout = function(){
            sharoodDB.logout().then(function(){
                sharoodDB.currentUser = null;
                navigation.navigate('#/');
            });
        }

    });

});