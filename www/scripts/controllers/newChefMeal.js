define(['controllers/module'], function (controllers) {

    'use strict';

    controllers.controller('NewChefMeal', function ($scope, sharoodDB, navigation, cameraHelper) {

        console.info("NewChefMeal controller");

        if(sharoodDB.currentUser === null){
            navigation.navigate('#/');
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
        }

        $scope.sendMeal = function() {
            var description = document.querySelector("#description").value;
            var peopleToCome = document.querySelector("#peopleToCome .active input").value;
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

            cameraHelper.getBase64FromURI($scope.imageMealURI).then(function(data) {
                sharoodDB.uploadFile(data).then(function(result) {
                    console.info(result.toJSON());
                    mealData.picture = result.toJSON().uid;
                    console.info(mealData.picture);
                    // If everything went well
                    sharoodDB.saveMeal(mealData).then(function(result){
                        // Navigate to list?
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
    });

});