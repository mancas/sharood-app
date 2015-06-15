define(['controllers/module'], function (controllers) {

    'use strict';

    controllers.controller('NewChefMeal', function ($scope, sharoodDB) {

        console.info("NewChefMeal controller");

        /*if(sharoodDB.currentUser === null){
            window.location.href = '#/';
            return;
        }*/

        $scope.sendMeal = function() {
            var description = document.querySelector("#description").value;
            var peopleToCome = document.querySelector("#peopleToComeGroup .active input").value;
            var mealType = document.querySelector("#mealType").value;
            var cookies = document.querySelector("#cookies").value;
            var timeHour = document.querySelector("#timeHour").value;
            var timeSchedule = document.querySelector("#timeSchedule").value;

            console.info(description, peopleToCome, mealType, cookies, timeHour, timeSchedule);

            var mealData = {
                picture: null,
                description: description,
                type: mealType,
                cookies_value: cookies,
                people: peopleToCome,
                time: timeHour + " " + timeSchedule,
                owner: sharoodDB.currentUser.uid
            }

            sharoodDB.saveMeal(mealData).then(function(result){
                console.info(result);
            });
        }

    });

});