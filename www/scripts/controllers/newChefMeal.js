define(['controllers/module', 'alert-helper'], function (controllers, AlertHelper) {

    'use strict';

    controllers.controller('NewChefMeal', function ($scope, sharoodDB, navigation, cameraHelper) {

        console.info("NewChefMeal controller");

        if(sharoodDB.currentUser === null){
            navigation.navigate('/');
            return;
        }

        $scope.imageMealURI = null;

        $scope.onerror = function(e) {
            console.error(e);
            // Show alert??
        };

        $scope.takePicture = function() {
            console.info("Getting Picture");
            cameraHelper.getPicture().then(function(imgURI){
                document.getElementById('placePhoto').style.backgroundImage = 'url(\'' + imgURI + '\')';
                $scope.imageMealURI = imgURI;
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

        $scope.sendMeal = function() {
            var description = document.querySelector("#description").value;
            var peopleToCome = document.querySelector("#peopleToCome .active input").value;
            var mealType = document.querySelector("#mealType").value;
            var cookies = document.querySelector("#cookies").value;
            var timeHour = document.querySelector("#timeHour").value;
            var timeSchedule = document.querySelector("#timeSchedule").value;
            var day = document.querySelector("#day").value;

            console.info(description, peopleToCome, mealType, cookies, timeHour, timeSchedule);

            var date = formatDate(timeHour, timeSchedule, day);

            var mealData = {
                picture: null,
                description: description,
                type: mealType,
                cookies_value: cookies,
                people: peopleToCome,
                time: date,
                owner: sharoodDB.currentUser.uid
            }

            cameraHelper.resizeImage($scope.imageMealURI).then(function(data) {
                sharoodDB.uploadFile(data).then(function(result) {
                    console.info(result.toJSON());
                    mealData.picture = result.toJSON().uid;
                    console.info(mealData.picture);
                    // If everything went well
                    sharoodDB.saveMeal(mealData).then(function(result){
                        AlertHelper.alert('#meal-created-alert');
                    }).catch($scope.onerror);
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
            subtitle: 'Your meal have been updated to our data base.',
            ok: {
                id: 'btn-ok',
                text: 'Ok',
                cssClass: 'btn-info',
                callback: function() {
                    navigation.navigate('/home');
                }
            }
        };
    });

});