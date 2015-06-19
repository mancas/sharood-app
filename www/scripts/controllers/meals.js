define(['controllers/module'], function (controllers) {

    'use strict';

    controllers.controller('Meals', function ($scope, sharoodDB, navigation) {
        
        console.info("Meals controller");

        /*if(sharoodDB.currentUser === null){
            navigation.navigate('#/');
            return;
        }*/

        sharoodDB.getAllMeals().then(function(meals) {
            console.info(meals);
            var mealsList = document.getElementById('mealsList');
            mealsList.innerHTML = '';
            meals.forEach(function(meal){
                meal = meal.toJSON();
                var domElement = '<a href="#" class="list-item">' +
                                    '<img class="li-small pull-left" src="/movidon/web/bundles/backend/img/user-1.jpg">' +
                                    '<span class="list-content media-body">' +
                                        '<b class="li-title">' + meal.description + '</b>' +
                                        '<small class="li-description">' +
                                            '<img class="li-xsmall" src="img/icon.png" /> ' + meal.people +
                                            '<img class="li-xsmall ml10" src="img/icon.png" /> ' + meal.cookies_value + ' - ' + meal.time
                                        '</small>' +
                                    '</span>' +
                                    '<div class="arrow-right">' +
                                        '<i class="fa fa-arrow-right">&gt;</i>' +
                                    '</div>' +
                                '</a>';
                mealsList.innerHTML += domElement;
            });
        });

        /*
        $scope.username = sharoodDB.currentUser.username;
        $scope.cookies = sharoodDB.currentUser.cookies;*/
        $scope.username = 'Axel';
        $scope.cookies = 31;

        $scope.navigate = navigation.navigate;

        $scope.meals = [];
    });

});