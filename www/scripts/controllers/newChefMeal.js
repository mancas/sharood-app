define(['controllers/module'], function (controllers) {

    'use strict';

    controllers.controller('NewChefMeal', function ($scope, sharoodDB, navigation, cameraHelper) {

        console.info("NewChefMeal controller");

        /*if(sharoodDB.currentUser === null){
            navigation.navigate('#/');
            return;
        }*/

        $scope.takePicture = function() {
            console.info("Getting Picture");
            cameraHelper.getPicture().then(function(imgURI){
                document.getElementById('placePhoto').setAttribute('src', imgURI);
                window.resolveLocalFileSystemURL(imgURI, function(fileEntry) {
                    console.info(fileEntry);
                    fileEntry.file(function(file){
                        console.info(file);
                        var fd = new FormData();

                        var reader = new FileReader();
                        reader.onloadend = function(e) {
                            var imgBlob = new Blob([reader.result], {type: "image/jpeg"} );
                            fd.append('file', imgBlob);
                            console.info(imgBlob);
                            sharoodDB.uploadFile(imgBlob).then(function(result){
                                console.info(result);
                            });

                            console.info(fd);
                        };
                        reader.readAsArrayBuffer(file);
                    }, function onerror(e){console.error(e)});
                }, function onerror(e){console.error(e)});
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

            sharoodDB.saveMeal(mealData).then(function(result){
                console.info(result);
            });
        };

        $scope.config = {
            values: [1, 2, 3, 4, 5],
            id: 'peopleToCome',
            name: 'peopleToCome'
        };

        $scope.navigate = navigation.navigate;
    });

});