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
            name: 'foodStars',
            number: Math.round(mealInfo.owner[0].food_level_rating / mealInfo.owner[0].food_level_rating_nofvotes),
            editable: false
        };

        $scope.friendlinessConfig = {
            values: [1, 2, 3, 4, 5],
            id: 'friendlinessStars',
            name: 'friendlinessStars',
            number: Math.round(mealInfo.owner[0].friendliness_chef_rating / mealInfo.owner[0].friendliness_chef_rating_nofvotes),
            editable: false
        };

        $scope.funConfig = {
            values: [1, 2, 3, 4, 5],
            id: 'funStars',
            name: 'funStars',
            number: Math.round(mealInfo.owner[0].fun_rating / mealInfo.owner[0].fun_rating_nofvotes),
            editable: false
        };

        function addPerson(meal){
            if(typeof meal.assistants == 'undefined'){
                meal.assistants = { assistant1: sharoodDB.currentUser.uid }
                return meal;
            } else {
                for(var i = 1; i <= meal.people; i++){
                    console.info('assistant' + i);
                    if(typeof meal.assistants[("assistant" + i)] == 'undefined'){
                        meal.assistants[("assistant" + i)] = [];
                    }
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

        $scope.getSeats = function(){
            var number = 0;

            for(var i = 1; i <= $scope.meal.people; i++){
                if(typeof $scope.meal.assistants[("assistant" + i)] !== 'undefined' && 
                   $scope.meal.assistants['assistant' + i].length !== 0){
                    number++;
                }
            }

            return $scope.meal.people - number;
        }

        $scope.navigate = navigation.navigate;

    });

});