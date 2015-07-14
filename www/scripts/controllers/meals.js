define(['controllers/module'], function (controllers) {

    'use strict';

    controllers.controller('Meals', function ($scope, sharoodDB, navigation, MealService, $q) {
        
        console.info("Meals controller");

        if(sharoodDB.currentUser === null){
            navigation.navigate('#/');
            return;
        }

        $scope.meals = [];
        $scope.AllMeals = [];
        var chunk = 10;

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

        sharoodDB.getAllMeals(0, 2).then(function(meals) {
            console.info(meals);
            var promises = meals.map(function(meal){
                return sharoodDB.addOwnerToMeal(meal.toJSON());
            });

            $q.all(promises).then(function(data) {
                console.info(data);
                $scope.AllMeals = data;

                var overlay = document.querySelector('.overlay');
                overlay.classList.add('closed');

                var lastIndex = chunk;
                if (lastIndex > $scope.AllMeals.length) {
                    lastIndex = $scope.AllMeals.length;
                }

                for (var i = 0; i < lastIndex; i++) {
                    $scope.meals.push($scope.AllMeals[i]);
                }
            });
        });

        $scope.loadMoreMeals = function() {
            var lastIndex = $scope.meals.length - 1;
            var newIndex = lastIndex + chunk;
            if (newIndex > $scope.AllMeals.length) {
                newIndex = $scope.AllMeals.length;
            }

            for (var i = lastIndex; i < newIndex; i++) {
                $scope.meals.push($scope.AllMeals[i]);
            }
        };

        
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