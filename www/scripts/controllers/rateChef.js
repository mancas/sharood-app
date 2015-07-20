define(['controllers/module'], function (controllers, AlertHelper) {

    'use strict';

    controllers.controller('RateChef', function ($scope, sharoodDB, navigation, MealService) {

        console.info("RateChef controller");

        if(sharoodDB.currentUser === null){
            navigation.navigate('/');
            return;
        }

        var mealInfo = MealService.getCurrentMeal();

        $scope.meal = mealInfo;

        $scope.foodLevelConfig = {
            values: [1, 2, 3, 4, 5],
            id: 'foodLevelStars',
            name: 'foodLevelStars',
            number: 1,
            editable: true
        };

        $scope.friendlinessConfig = {
            values: [1, 2, 3, 4, 5],
            id: 'friendlinessStars',
            name: 'friendlinessStars',
            number: 1,
            editable: true
        };

        $scope.funConfig = {
            values: [1, 2, 3, 4, 5],
            id: 'funStars',
            name: 'funStars',
            number: 1,
            editable: true
        };

        $scope.navigate = navigation.navigate;

    });

});