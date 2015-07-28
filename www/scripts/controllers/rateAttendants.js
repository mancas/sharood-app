define(['controllers/module', 'alert-helper'], function (controllers, AlertHelper) {

    'use strict';

    controllers.controller('RateAttendants', function ($scope, sharoodDB, navigation, MealService, $q) {

        console.info("RateAttendants controller");

        if(sharoodDB.currentUser === null){
            navigation.navigate('/');
            return;
        }

        var mealInfo = MealService.getCurrentMeal();

        $scope.meal = mealInfo;

        $scope.attendant1Config = {
            values: [1, 2, 3, 4, 5],
            id: 'attendant1Stars',
            name: 'attendant1Stars',
            number: 1,
            editable: true
        };

        $scope.attendant2Config = {
            values: [1, 2, 3, 4, 5],
            id: 'attendant2Stars',
            name: 'attendant2Stars',
            number: 1,
            editable: true
        };

        $scope.attendant3Config = {
            values: [1, 2, 3, 4, 5],
            id: 'attendant3Stars',
            name: 'attendant3Stars',
            number: 1,
            editable: true
        };

        $scope.attendant4Config = {
            values: [1, 2, 3, 4, 5],
            id: 'attendant4Stars',
            name: 'attendant4Stars',
            number: 1,
            editable: true
        };

        $scope.attendant5Config = {
            values: [1, 2, 3, 4, 5],
            id: 'attendant5Stars',
            name: 'attendant5Stars',
            number: 1,
            editable: true
        };

        $scope.attendantEmpty = function(position){
            if(typeof $scope.meal.assistants[("assistant" + position)] !== 'undefined' && 
               $scope.meal.assistants['assistant' + position].length !== 0){
                return false;
            }

            return true;
        }

        function addUserVote(meal) {
            if(typeof meal.votedby == 'undefined'){
                meal.votedby = [sharoodDB.currentUser.uid];
            } else {
                meal.votedby.push(sharoodDB.currentUser.uid);
            }

            return meal;
        }

        $scope.sendResults = function(){
            var promises = [];
            var overlay = document.querySelector('.overlay');
            overlay.classList.remove('closed');

            for(var i = 1; i <= $scope.meal.people; i++){
                if(typeof $scope.meal.assistants[("assistant" + i)] !== 'undefined' && 
                   $scope.meal.assistants['assistant' + i].length !== 0){
    
                    var attendantRate = document.getElementById('attendant' + i + 'Stars').querySelectorAll('.active').length;

                    var assistantPromise = sharoodDB.addVotesToUser(mealInfo.assistants[("assistant" + i)][0].uid, attendantRate).then(function(result){
                        console.info(result);
                    });

                    promises.push(assistantPromise);

                }
            }

            $q.all(promises).then(function(){
                sharoodDB.getmealById(mealInfo.uid).then(function(result){
                    console.info(result);
                    var mealResult = addUserVote(result);
                    console.info(mealResult);
                    delete mealResult.picture;
                    sharoodDB.saveMeal(mealResult).then(function(result){
                        overlay.classList.add('closed');
                        AlertHelper.alert('#rate-success-alert');
                    });
                });
            });
        }

        $scope.navigate = navigation.navigate;

        $scope.rateAlertConfig = {
            id: 'rate-success-alert',
            icon: false,
            title: 'Thanks!',
            subtitle: 'Your feedback has been registered successfully',
            ok: {
                id: 'btn-ok',
                text: 'Ok',
                cssClass: 'btn-info',
                callback: function() {
                    navigation.navigate('/myMealInfo');
                }
            }
        };
    });

});