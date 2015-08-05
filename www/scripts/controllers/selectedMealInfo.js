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
            var currentUser = sharoodDB.currentUser.uid;

            sharoodDB.transferCookies(owner, currentUser, cookies).then(function() {
                for (var i = 0; i < 5; i++) {
                    if ($scope.meal.assistants['assistant' + i] &&
                        currentUser === $scope.meal.assistants['assistant' + i][0].uid) {
                        $scope.meal.assistants['assistant' + i][0] = null;
                        delete $scope.meal.picture;
                        sharoodDB.saveMeal($scope.meal).then(function() {
                            navigation.navigate('/home')
                        });
                        break;
                    }
                }
            });
        }

    });

});