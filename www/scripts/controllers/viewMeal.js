define(['controllers/module'], function (controllers) {

    'use strict';

    controllers.controller('ViewMeal', function ($scope, MealService, sharoodDB, navigation) {
        
        console.info("ViewMeal controller");

        var mealInfo = MealService.getCurrentMeal();

		$scope.meal = mealInfo;  

        console.info($scope.meal);

        $scope.navigate = navigation.navigate;

    });

});