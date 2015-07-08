define(['controllers/module'], function (controllers) {

    'use strict';

    controllers.controller('ViewMeal', function ($scope, $routeParams, sharoodDB, navigation) {
        
        console.info("ViewMeal controller");

        alert($routeParams.mealId);

    });

});