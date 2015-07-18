define(['controllers/module'], function (controllers, AlertHelper) {

    'use strict';

    controllers.controller('SelectedMealInfo', function ($scope, sharoodDB, navigation, MealService) {

        console.info("SelectedMealInfo controller");

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