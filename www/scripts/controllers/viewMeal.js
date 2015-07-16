define(['controllers/module'], function (controllers) {

    'use strict';

    controllers.controller('ViewMeal', function ($scope, MealService, sharoodDB, navigation) {
        
        console.info("ViewMeal controller");

        var mealInfo = MealService.getCurrentMeal();

		$scope.meal = mealInfo;  

        console.info($scope.meal);

        $scope.foodConfig = {
            values: [1, 2, 3, 4, 5],
            id: 'foodStars',
            name: 'foodStars'
        };

        $scope.friendlinessConfig = {
            values: [1, 2, 3, 4, 5],
            id: 'friendlinessStars',
            name: 'friendlinessStars'
        };

        $scope.funConfig = {
            values: [1, 2, 3, 4, 5],
            id: 'funStars',
            name: 'funStars'
        };

        function addPerson(meal){
            if(!meal.assistants){
                meal.assistants = { assistant1: sharoodDB.currentUser.uid }
                return meal;
            } else {
                for(var i = 1; i <= 5; i++){
                    console.info('assistant' + i);
                    if(!meal.assistants['assistant' + i][0]){
                        meal.assistants['assistant' + i][0] = sharoodDB.currentUser.uid;
                        return meal;
                    }
                }
            }
            return false;
        }

        $scope.saveSeat = function(){
            sharoodDB.getmealById(mealInfo.uid).then(function(result){
                var mealResult = addPerson(result);
                if(mealResult){
                    delete mealResult.picture;
                    sharoodDB.saveMeal(mealResult).then(function(result){
                        alert('Te has apuntado correctamente en la comida');
                    });
                } else {
                    alert('Asistentes completos');
                }
            });
        }

        $scope.navigate = navigation.navigate;

    });

});