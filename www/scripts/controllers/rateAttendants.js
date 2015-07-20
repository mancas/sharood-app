define(['controllers/module'], function (controllers, AlertHelper) {

    'use strict';

    controllers.controller('RateAttendants', function ($scope, sharoodDB, navigation, MealService) {

        console.info("RateAttendants controller");

        if(sharoodDB.currentUser === null){
            navigation.navigate('/');
            return;
        }

        var mealInfo = MealService.getCurrentMeal();

        $scope.meal = mealInfo;

        $scope.navigate = navigation.navigate;

    });

});