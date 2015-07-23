define(['controllers/module'], function (controllers) {

    'use strict';

    controllers.controller('Meals', function ($scope, sharoodDB, navigation, MealService, $q) {
        
        console.info("Meals controller");

        if(sharoodDB.currentUser === null){
            navigation.navigate('/');
            return;
        }

        $scope.mealsToRender = [];
        $scope.AllMeals = [];
        $scope.ToAttendMeals = [];
        $scope.MyMeals = [];
        $scope.currentMeals = [];
        var chunk = 10;
        var toggleMeals = {
            meals: {
                elements: 'AllMeals',
                load: true,
                method: 'getAllMeals'
            },
            toAttend: {
                elements: 'ToAttendMeals',
                load: false,
                method: 'getAllMealsByAssistant'
            },
            myMeals: {
                elements: 'MyMeals',
                load: false,
                method: 'getAllMealsByOwner'
            }
        };

        $scope.loadFirstElements = function() {
            var lastIndex = chunk;
            // Clean array
            $scope.mealsToRender = [];
            if (lastIndex > $scope.currentMeals.length) {
                lastIndex = $scope.currentMeals.length;
            }

            for (var i = 0; i < lastIndex; i++) {
                $scope.mealsToRender.push($scope.currentMeals[i]);
            }
        }

        $scope.drawImages = function() {
            var queue = angular.copy($scope.mealsToRender);
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

        /*
        sharoodDB.getAllMealsByOwner(sharoodDB.currentUser.uid).then(function(meals) {
            console.info(meals);
        });

        sharoodDB.getAllMealsByAssistant(sharoodDB.currentUser.uid).then(function(meals) {
            console.info(meals);
        });
        */

        sharoodDB.getAllMealsByAssistant(sharoodDB.currentUser.uid).then(function(meals) {
            console.info(meals);
            if(meals.length == 0){
                sharoodDB.getAllMeals().then(function(meals) {
                    console.info(meals);
                    meals.forEach(function(meal){
                        console.info(meal.toJSON());
                        $scope.AllMeals.push(meal.toJSON());
                        $scope.currentMeals.push(meal.toJSON());
                    });

                    var overlay = document.querySelector('.overlay');
                    overlay.classList.add('closed');

                    $scope.loadFirstElements();
                });
            } else {
                MealService.setCurrentMeal(meals[0].toJSON());
                navigation.navigate('/selectedMealInfo');
            }
        });

        $scope.loadMoreMeals = function() {
            console.info('load!');
            if (!$scope.mealsToRender.length) {
                return;
            }

            var lastIndex = $scope.mealsToRender.length - 1;
            var newIndex = lastIndex + chunk;

            if (lastIndex === $scope.currentMeals.length) {
                return;
            } else if (newIndex > $scope.currentMeals.length) {
                newIndex = $scope.currentMeals.length;
            }

            for (var i = lastIndex; i < newIndex; i++) {
                console.info($scope.currentMeals[i]);
                $scope.mealsToRender.push($scope.currentMeals[i]);
            }

            console.info($scope.mealsToRender);
        };

        
        $scope.username = sharoodDB.currentUser.username;
        $scope.cookies = sharoodDB.currentUser.cookies;
        /*
        $scope.username = 'Axel';
        $scope.cookies = 31;
        */

        $scope.navigate = navigation.navigate;

        $scope.goToMeal = function(mealIndex){
            MealService.setCurrentMeal($scope.mealsToRender[mealIndex]);
            navigation.navigate('/viewMeal');
        };

        $scope.toggleCurrentMeals = function(listId) {
            if (toggleMeals[listId]) {
                var mealsOptions = toggleMeals[listId];
                if (mealsOptions.load) {
                    $scope.currentMeals = $scope[mealsOptions.elements];
                    $scope.loadFirstElements();
                    return;
                }

                // Load when needed
                sharoodDB[mealsOptions.method](sharoodDB.currentUser.uid).then(function(meals) {
                    console.info('new meals loaded', meals);
                    mealsOptions.load = true;
                    $scope.currentMeals = $scope[mealsOptions.elements] = [];
                    meals.forEach(function(meal){
                        $scope.AllMeals.push(meal.toJSON());
                        $scope.currentMeals.push(meal.toJSON());
                        $scope[mealsOptions.elements].push(meal.toJSON());
                    });
                    $scope.loadFirstElements();
                });
            }
        }

        $scope.$on('$viewContentLoaded', function() {
            var btns = document.querySelectorAll('.toggle-meals button');
            Array.prototype.forEach.call(btns, function(btn) {
                btn.addEventListener('click', function fn(evt) {
                    evt.preventDefault();
                    var currentActive = document.querySelector('.toggle-meals button.active');
                    currentActive.classList.remove('active');
                    btn.classList.add('active');

                    var list = btn.dataset.list;
                    console.info(list);
                    $scope.toggleCurrentMeals(list);
                });
            });
        });

    });

});