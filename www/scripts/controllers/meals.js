define(['controllers/module'], function (controllers) {

    'use strict';

    controllers.controller('Meals', function ($scope, sharoodDB, navigation, $compile) {
        
        console.info("Meals controller");

        if(sharoodDB.currentUser === null){
            navigation.navigate('#/');
            return;
        }

        $scope.meals = [];

        sharoodDB.getAllMeals().then(function(meals) {
            console.info(meals);
            meals.forEach(function(meal){
                $scope.meals.push(meal.toJSON());
            });

            // Update UX
            $scope.$apply();
            var overlay = document.querySelector('.overlay');
            overlay.classList.add('closed');
        });

        
        $scope.username = sharoodDB.currentUser.username;
        $scope.cookies = sharoodDB.currentUser.cookies;
        /*
        $scope.username = 'Axel';
        $scope.cookies = 31;
        */

        $scope.navigate = navigation.navigate;

        $scope.meals = [];
    });

});