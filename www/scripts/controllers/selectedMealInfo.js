define(['controllers/module'], function (controllers, AlertHelper) {

    'use strict';

    controllers.controller('SelectedMealInfo', function ($scope, sharoodDB, navigation, MealService) {

        console.info("SelectedMealInfo controller");

        if(sharoodDB.currentUser === null){
            navigation.navigate('/');
            return;
        }

        $scope.meal = MealService.getCurrentMeal();

        console.info($scope.meal);

        $scope.navigate = navigation.navigate;

        $scope.cancel = function() {
            console.info($scope.meal);
            var cookies = $scope.meal.cookies_value;
            var owner = $scope.meal.owner[0].uid;
            var currentUser = $scope.currentUser.uid;

            sharoodDB.transferCookies(owner, currentUser, cookies).then(function() {
                // TODO
            });
        }

    });

});