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

        $scope.contactChef = function () {
            window.plugin.email.open({
                to: [$scope.meal.owner[0].email]
            });
        }

        $scope.cancel = function() {
            console.info($scope.meal);
            var cookies = $scope.meal.cookies_value;
            var owner = $scope.meal.owner[0].uid;
            var currentUser = sharoodDB.currentUser.uid;

            sharoodDB.transferCookies(owner, currentUser, cookies).then(function() {
                for (var i = 1; i <= 5; i++) {
                    if ($scope.meal.assistants['assistant' + i] &&
                        currentUser === $scope.meal.assistants['assistant' + i][0].uid) {
                        delete $scope.meal.assistants['assistant' + i][0];
                        delete $scope.meal.picture;
                        console.info($scope.meal);
                        sharoodDB.saveMeal($scope.meal).then(function() {
                            navigation.navigate('/home')
                        });
                        break;
                    }
                }
            });
        }

        function deleteAttendant(mealUid) {
            sharoodDB.getmealById(mealUid).then(function(result){
                for (var i = 1; i <= 5; i++) {
                    if (mealResult.assistants['assistant' + i] &&
                        currentUser === mealResult.assistants['assistant' + i][0].uid) {
                        delete result.picture;
                        delete result.assistants['assistant' + i][0];
                        console.info(result);
                        sharoodDB.saveMeal(meal).then(function() {
                            navigation.navigate('/home')
                        });
                        break;
                    }
                }
            });
        }

    });

});