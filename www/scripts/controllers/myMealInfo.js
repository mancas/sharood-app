define(['controllers/module'], function (controllers, AlertHelper) {

    'use strict';

    controllers.controller('MyMealInfo', function ($scope, sharoodDB, navigation, MealService) {

        console.info("MyMealInfo controller");

        if(sharoodDB.currentUser === null){
            navigation.navigate('/');
            return;
        }

        var mealInfo = MealService.getCurrentMeal();

        $scope.meal = mealInfo;

        console.info($scope.meal);

        $scope.navigate = navigation.navigate;

    });

});