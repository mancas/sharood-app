define(['controllers/module'], function (controllers) {

    'use strict';

    controllers.controller('Meals', function ($scope, sharoodDB, navigation, MealService) {
        
        console.info("Meals controller");

        if(sharoodDB.currentUser === null){
            navigation.navigate('#/');
            return;
        }

        $scope.meals = [];

        $scope.drawImages = function() {
            var queue = angular.copy($scope.meals);
            var currentIndex = 0;

            function processQueue() {
                var currentElement = queue.shift();
                if (!currentElement) {
                    // Last element
                    return;
                }
                var listItem = document.querySelector('[data-index="' + currentIndex + '"]');
                var img = listItem.querySelector('img');

                img.onload = function() {
                    currentIndex++;
                    processQueue();
                };

                img.onerror = function(e) {
                    console.error('Error while loading image ' + currentIndex);
                    currentIndex++;
                    processQueue();
                }

                img.src = currentElement.picture.url;
            }

            processQueue();
        };

        $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
            $scope.drawImages();
        });

        sharoodDB.getAllMeals().then(function(meals) {
            console.info(meals);
            meals.forEach(function(meal){
                $scope.meals.push(meal.toJSON());
            });

            // Update UX
            //$scope.$apply();
            var overlay = document.querySelector('.overlay');
            overlay.classList.add('closed');
        });

        
        $scope.username = sharoodDB.currentUser.username;
        $scope.cookies = sharoodDB.currentUser.cookies;
        /*
        $scope.username = 'Axel';
        $scope.cookies = 31;
        */

        $scope.navigate = navigation.navigate;

        $scope.goToMeal = function(mealIndex){
            MealService.setCurrentMeal($scope.meals[mealIndex]);
            navigation.navigate('/viewMeal');
        };

    });

});