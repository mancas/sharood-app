define(['controllers/module'], function (controllers, AlertHelper) {

    'use strict';

    controllers.controller('MyMealInfo', function ($scope, sharoodDB, navigation, MealService) {

        console.info("MyMealInfo controller");

        if(sharoodDB.currentUser === null){
            navigation.navigate('/');
            return;
        }

        function toSingleArray(multipleArray) {
            var singleArray = [];
            function addElement(element) {
                if (Array.isArray(element)) {
                    if (element[0])
                        singleArray.push(element[0]);
                } else {
                    singleArray.push(element);
                }
            }

            if (Array.isArray(multipleArray)) {
                Array.prototype.forEach.call(multipleArray, function (element) {
                    addElement(element);
                });
            } else {
                for (var key in multipleArray) {
                    addElement(multipleArray[key]);
                }
            }

            return singleArray;
        }

        $scope.meal = MealService.getCurrentMeal();

        console.info($scope.meal);

        $scope.navigate = navigation.navigate;

        $scope.attendants = toSingleArray($scope.meal.assistants);

        $scope.update = function() {
            var icon = document.querySelector('#updateAttendants i');
            icon.classList.add('fa-spin');

            sharoodDB.getMealWithAttendantsById($scope.meal.uid).then(function(meal) {
                $scope.meal = meal[0].toJSON();
                console.info(meal);
                $scope.attendants = toSingleArray($scope.meal.assistants);
                console.info($scope.attendants);
                icon.classList.remove('fa-spin');
            });
        };
    });

});