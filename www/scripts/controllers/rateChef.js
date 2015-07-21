define(['controllers/module'], function (controllers, AlertHelper) {

    'use strict';

    controllers.controller('RateChef', function ($scope, sharoodDB, navigation, MealService) {

        console.info("RateChef controller");

        if(sharoodDB.currentUser === null){
            navigation.navigate('/');
            return;
        }

        var mealInfo = MealService.getCurrentMeal();

        $scope.meal = mealInfo;

        $scope.foodLevelConfig = {
            values: [1, 2, 3, 4, 5],
            id: 'foodLevelStars',
            name: 'foodLevelStars',
            number: 1,
            editable: true
        };

        $scope.friendlinessConfig = {
            values: [1, 2, 3, 4, 5],
            id: 'friendlinessStars',
            name: 'friendlinessStars',
            number: 1,
            editable: true
        };

        $scope.funConfig = {
            values: [1, 2, 3, 4, 5],
            id: 'funStars',
            name: 'funStars',
            number: 1,
            editable: true
        };

        $scope.vote = function(){
            var foodLevelStars = document.getElementById('foodLevelStars').querySelectorAll('.active').length;
            var friendlinessStars = document.getElementById('friendlinessStars').querySelectorAll('.active').length;
            var funStars = document.getElementById('funStars').querySelectorAll('.active').length;

            console.info(foodLevelStars, friendlinessStars, funStars);

            sharoodDB.addVotesToUser(mealInfo.owner[0].uid, friendlinessStars, foodLevelStars, funStars).then(function(result){
                console.info(result);
                sharoodDB.getmealById(mealInfo.uid).then(function(result){
                    console.info(result);
                    var mealResult = addUserVote(result);
                    console.info(mealResult);
                    delete mealResult.picture;
                    sharoodDB.saveMeal(mealResult).then(function(result){
                        alert('Has votado');
                    });
                });
            });
        }

        function addUserVote(meal) {
            if(typeof meal.votedby == 'undefined'){
                meal.votedby = [sharoodDB.currentUser.uid];
            } else {
                meal.votedby.push(sharoodDB.currentUser.uid);
            }

            return meal;
        }

        $scope.navigate = navigation.navigate;

    });

});