define(['controllers/module', 'alert-helper'], function (controllers, AlertHelper) {

    'use strict';

    controllers.controller('NewChefMeal', function ($scope, sharoodDB, navigation, MealService, cameraHelper) {

        console.info("NewChefMeal controller");

        if(sharoodDB.currentUser === null){
            navigation.navigate('/');
            return;
        }

        sharoodDB.getAllMealsByOwner(sharoodDB.currentUser.uid).then(function(meals) {
            console.info(meals);
            if(meals.length == 0){
                var overlay = document.querySelector('.overlay');
                overlay.classList.add('closed');
            } else {
                MealService.setCurrentMeal(meals[0].toJSON());
                navigation.navigate('/myMealInfo');
            }
        });

        $scope.imageBase64 = null;

        $scope.onerror = function(e) {
            console.error(e);
            overlay.classList.remove('closed');
            // Show alert??
        };

        $scope.takePicture = function() {
            console.info("Getting Picture");
            cameraHelper.getPicture().then(function(base64){
                var photo = document.getElementById('placePhoto');
                photo.style.backgroundImage = 'url(data:image/jpeg;base64,' + base64 + ')';
                photo.classList.add('cover');

                $scope.imageBase64 = 'data:image/jpeg;base64,' + base64;
            });
        };

        function formatDate(timeHour, timeSchedule, day){
            var date = new Date();
            
            timeHour = timeHour.split(':');
            var hours = parseInt(timeHour[0]);
            var minutes = parseInt(timeHour[1]);

            if (timeSchedule == "pm") {
                hours += 12;
            }

            date.setHours(hours);
            date.setMinutes(minutes);  
            date.setSeconds(0); 
            if (day == "tomorrow") {
                date.setDate(date.getDate() + 1);
            }

            return date;

        }

        $scope.mealData = {
            picture: null,
            description: null,
            type: null,
            cookies_value: null,
            people: null,
            time: null,
            tempTime: null,
            owner: sharoodDB.currentUser.uid,
            university: sharoodDB.currentUser.university[0]
        };

        $scope.sendMeal = function() {
            console.info($scope.newMealForm);
            if (!$scope.newMealForm.$valid) {
                console.info('no validate');
                return;
            }

            var peopleToCome = document.querySelector("#peopleToCome .active input").value;
            var timeSchedule = document.querySelector("#timeSchedule").value;
            var day = document.querySelector("#day").value;
            var overlay = document.querySelector('.overlay');

            var date = formatDate($scope.mealData.tempTime, timeSchedule, day);
            $scope.mealData.people = peopleToCome;
            $scope.mealData.time = date;

            if (!$scope.imageBase64) {
                AlertHelper.alert('#meal-error-alert');
                return;
            }

            overlay.classList.remove('closed');
            var data = cameraHelper.buildServerImg($scope.imageBase64);
            sharoodDB.uploadFile(data).then(function(result) {
                $scope.mealData.picture = result.toJSON().uid;
                // If everything went well
                delete $scope.mealData.tempTime;
                sharoodDB.saveMeal($scope.mealData).then(function(result){
                    overlay.classList.add('closed');
                    AlertHelper.alert('#meal-created-alert');
                }).catch($scope.onerror);
            }).catch($scope.onerror);
        };

        $scope.config = {
            values: [1, 2, 3, 4, 5],
            id: 'peopleToCome',
            name: 'peopleToCome'
        };

        $scope.navigate = navigation.navigate;

        $scope.mealConfig = {
            id: 'meal-created-alert',
            icon: false,
            title: 'Meal created',
            subtitle: 'Awesome! Your meal has been posted.',
            ok: {
                id: 'btn-ok',
                text: 'Ok',
                cssClass: 'btn-info',
                callback: function() {
                    navigation.navigate('/viewMeal/:onlyInfo');
                }
            }
        };

        $scope.errorConfig = {
            id: 'meal-error-alert',
            icon: true,
            title: 'Oops!',
            subtitle: 'You need to add a photo to the meal.',
            ok: {
                id: 'btn-ok',
                text: 'Ok',
                cssClass: 'btn-info',
                callback: function() {
                    AlertHelper.close('#meal-created-alert');
                }
            }
        };
    });

});