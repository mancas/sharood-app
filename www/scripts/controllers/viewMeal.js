define(['controllers/module', 'alert-helper'], function (controllers, AlertHelper) {

    'use strict';

    controllers.controller('ViewMeal', function ($scope, MealService, sharoodDB, navigation) {
        
        console.info("ViewMeal controller");

        var mealInfo = MealService.getCurrentMeal();
        var errorSavingSeat = false;
        var ALERT_TITLES = {
            error: {
                title: 'Opps!',
                subtitle: 'There is no seat!'
            },
            success: {
                title: 'Awesome!',
                subtitle: 'You have saved your seat for this meal'
            }
        };

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
                        errorSavingSeat = false;
                        updateAlertTitles();
                        AlertHelper.alert('#save-seat-alert');
                    });
                } else {
                    errorSavingSeat = true;
                    updateAlertTitles();
                    AlertHelper.alert('#save-seat-alert');
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

        function updateAlertTitles() {
            var key = 'success';
            if (errorSavingSeat) {
                key = 'error';
            }

            var alert = document.querySelector('#save-seat-alert');
            var title = alert.querySelector('h2');
            var subtitle = alert.querySelector('p');

            title.textContent = ALERT_TITLES[key].title;
            subtitle.textContent = ALERT_TITLES[key].subtitle;
        }

        function onsuccess() {
            if (!errorSavingSeat) {
                $scope.navigate('/home');
            } else {
                AlertHelper.close('#save-seat-alert');
            }
        }

        $scope.navigate = navigation.navigate;

        $scope.saveSeatConfig = {
            id: 'save-seat-alert',
            icon: false,
            title: 'Awesome!',
            subtitle: 'You have saved your seat for this meal',
            ok: {
                id: 'btn-ok',
                text: 'Ok',
                cssClass: 'btn-info',
                callback: onsuccess
            }
        };
    });

});