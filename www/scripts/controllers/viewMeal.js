define(['controllers/module'], function (controllers) {

    'use strict';

    controllers.controller('ViewMeal', function ($scope, MealService, sharoodDB, navigation) {
        
        console.info("ViewMeal controller");

        $scope.meal = MealService.getCurrentMeal();
        console.info($scope.meal);

    });

});